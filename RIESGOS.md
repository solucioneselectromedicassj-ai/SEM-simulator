# Registro de riesgos — SEM Simulator

Este documento lista qué puede fallar en el equipo y la app, qué efecto tiene
sobre el monitor que se está verificando, y qué control existe hoy. No es una
certificación formal (eso no corresponde para un equipo de uso interno, no
comercializado) — es la misma disciplina que usan los fabricantes de
simuladores de paciente (Fluke Biomedical, Rigel, Datrend) aplicada a este
proyecto: un registro vivo que se actualiza cada vez que aparece un bug nuevo.

La severidad usa como referencia informal las clases de IEC 62304 (software
de dispositivos médicos), pensando el riesgo en términos de qué pasaría con
el monitor bajo prueba y, en última instancia, con un paciente real que ese
monitor atienda después:

- **A** — no hay forma de que llegue a afectar una medición real.
- **B** — puede llevar a una calibración o lectura incorrecta, sin daño directo.
- **C** — puede llevar a que un monitor quede mal calibrado sin que se note,
  y eso sí puede afectar a un paciente real más adelante.

## Riesgos corregidos

| ID | Riesgo | Causa | Efecto en el monitor bajo prueba | Severidad | Control | Versión |
|----|--------|-------|-----------------------------------|-----------|---------|---------|
| R1 | FC reportada muy por debajo de lo pedido (ej: pedís 80, da ~48) | `readPressure()` (I2C bloqueante) corría sin límite en cada vuelta del `loop()`, atrasando el bloque del DAC muy por debajo de 250Hz | El monitor cuenta mal los latidos | C | Fase del ECG avanza por tiempo real medido (`micros()`), no por tasa asumida; `readPressure()` limitado a 1 lectura/10ms | v2.2 |
| R2 | NIBP podía colgarse o comportarse de forma indefinida durante asistolia/FV | División por cero (`60000/sim.hr` con `hr=0`) convertida a `unsigned long` | Medición de presión no confiable durante un escenario de paro simulado | B | Guard `max(1.0f, sim.hr)` | v2.3 |
| R3 | Onda de ECG se congela y salta ~1 ciclo cada 2 segundos; FC inconsistente sin relación fija (72→54, 150→160); formas cuadrada/triangular imperfectas | `tempSensor.requestTemperatures()` bloqueaba hasta 750ms esperando la conversión del DS18B20, congelando también el DAC del ECG | El monitor pierde latidos o detecta saltos como latidos falsos — error no predecible, difícil de diagnosticar sin mirar el firmware | C | `setWaitForConversion(false)`: conversión asíncrona, no bloquea el loop | v2.6 |
| R4 | BLE se conecta una vez y después no se puede volver a encontrar el equipo | `BLEDevice::init()` no incluía el nombre en el paquete de advertising sin `setScanResponse(true)` | Pérdida total de conexión, requiere reiniciar el módulo | B | `setScanResponse(true)` | v2.5 |
| R5 | BLE se corta en medio de una prueba de campo si el celular apaga la pantalla, exige re-sincronizar varias veces a mano | Android suelta la conexión BLE de la pestaña en segundo plano / pantalla apagada | Interrupción de la prueba, riesgo de no notar si se perdió una medición en curso | B | Screen Wake Lock mientras hay conexión real + reconexión automática con reintentos | app, commit `e29dc4b` |
| R11 | Contraseña del punto de acceso WiFi débil (`sem12345`: 8 caracteres, patrón de diccionario) | Elegida sin pensar en que cualquiera a distancia de WiFi del equipo podía intentar adivinarla | Alguien ajeno podría conectarse y mandar comandos, corrompiendo una verificación en curso sin que el técnico lo note | B | Contraseña más larga, sin patrón de diccionario | v2.9 |
| R12 | `parseCmd()` aceptaba cualquier número tal cual llegaba por WiFi/BLE, sin rango | Sin validación de entrada — un comando corrupto o mal armado podía dejar `sim.hr`/`spo2`/etc en un valor absurdo | Salida simulada sin sentido físico, sin ningún aviso | B | `constrain()` a un rango físicamente razonable por cada campo | v2.9 |

## Riesgos con control parcial o pendiente

| ID | Riesgo | Efecto en el monitor bajo prueba | Severidad | Control actual | Qué falta |
|----|--------|-----------------------------------|-----------|-----------------|-----------|
| R6 | Si el MCP4725 (DAC) o el ADS1115 (ADC) no inicializan bien (cable flojo, dirección I2C incorrecta), el equipo parece andar pero no sale señal real | El técnico puede creer que probó el monitor cuando en realidad no hubo señal de ECG o lectura de presión válida | C | `dacOK`/`adsOK` ahora se mandan a la app y se muestran como aviso visible (v2.8 firmware + app) | — resuelto con este cambio |
| R7 | Si pasa la fecha de "próxima calibración" cargada en Ajustes, no había ningún aviso | El técnico puede seguir usando una referencia de calibración vencida sin darse cuenta | B | Aviso visible en toda la app cuando `nextDate` ya pasó (este cambio) | — resuelto con este cambio |
| R8 | El sensor de presión (ADS1115 + transductor) no tiene una segunda fuente de referencia independiente dentro del equipo | Un error sistemático de ese sensor (deriva, descalibración) no se detecta solo — todo lo que depende de él (NIBP y la referencia para aneroides) hereda el error sin avisar | C | Ninguno en software — depende de disciplina humana | Calibración periódica contra un patrón certificado, documentada en Ajustes (ver `PROTOCOLO_VERIFICACION.md`) |
| R9 | El ajuste automático LED↔fotodiodo de SpO2 corrige el balance relativo entre los 2 LEDs, pero no valida que el fotodiodo en sí esté sano (sucio, degradado) | Podría compensar mal sin que se note en la app | B | Corrección automática con límite ±2x (no puede desviar la señal de golpe) | Punto de verificación visual/manual periódico de las sondas |
| R10 | No hay protocolo escrito de qué probar antes de llevar el equipo a campo | Dependía de memoria/criterio del técnico qué y cuánto verificar | B | — | Resuelto con `PROTOCOLO_VERIFICACION.md` |
| R13 | El servicio BLE no pide pairing/bonding — no hay `BLESecurity` configurado | Cualquier celular en rango que sepa el nombre del dispositivo y los UUID de servicio/característica puede conectarse y mandar comandos, sin que el técnico lo autorice | B | Ninguno — el canal WiFi sí quedó protegido por contraseña (R11), BLE queda abierto | Agregar pairing/bonding BLE (`BLESecurity`, `ESP_LE_AUTH_REQ_SC_BOND`) — pendiente de probar que no rompa la reconexión sin selector que ya usa la app (Web Bluetooth y el pairing nativo no siempre conviven bien) |

## Cómo se actualiza esto

Cada vez que aparezca un bug nuevo (en campo o durante desarrollo), agregarlo
acá antes de cerrarlo: qué pasó, qué pudo haber afectado en una prueba real,
y qué control se agregó. Si el control es "depende de que el técnico se
acuerde de hacer X", es una señal de que falta blindarlo en software o en el
protocolo.
