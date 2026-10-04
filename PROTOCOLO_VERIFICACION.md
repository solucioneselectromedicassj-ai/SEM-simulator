# Protocolo de verificación — SEM Simulator

Checklist para usar antes y durante una salida a campo. La idea no es
burocracia — es no depender de la memoria para notar algo que el equipo
mismo ya puede avisar, y dejar un criterio fijo de cuántos puntos probar
para poder confiar en el resultado.

## 1. Antes de salir (pre-vuelo)

- [ ] Abrir la app y entrar a **Ajustes**: ningún parámetro calibrado debe
      mostrar el aviso de "Calibración vencida" en el encabezado. Si lo
      muestra, recalibrar contra el instrumento patrón antes de salir.
- [ ] Verificar batería del módulo (se ve en Ajustes / vía sensores).
- [ ] Conectar por BLE o WiFi y dejarlo conectado ~1 minuto en la app:
      no debe aparecer "Reconectando por Bluetooth..." de forma repetida.
      Si se reconecta solo una vez y queda estable, normal. Si se repite,
      revisar antes de salir.
- [ ] Si aparece el aviso de "DAC no responde" o "ADC no responde" en el
      encabezado, no llevar el equipo — hay un problema de hardware (cable
      I2C, dirección, alimentación) que hay que resolver antes.

## 2. ECG

- [ ] Frecuencia: probar al menos 3 puntos — bajo (~40 bpm), normal (~80
      bpm), alto (~150 bpm) — y confirmar que el monitor bajo prueba
      coincide dentro de lo esperado en cada uno.
- [ ] Amplitud: con "Tipo de señal" en Cuadrada, amplitud 1.0 mV, confirmar
      que el monitor mide ~1.0 mV (tolerancia según el monitor).
- [ ] Forma de onda: confirmar visualmente que Cuadrada, Triangular y
      Senoidal se ven como corresponde en la pantalla del monitor, no solo
      en la app.
- [ ] Si corresponde, probar al menos un ritmo patológico (ej. FV o
      asistolia) y confirmar que el monitor dispara su alarma.

## 3. SpO₂

- [ ] Probar al menos 2 puntos: uno normal (~98%) y uno bajo (~90%),
      confirmar que el monitor los lee dentro de tolerancia.
- [ ] Confirmar que la FC de pulso que muestra el monitor coincide con la
      FC configurada en la app.

## 4. NIBP — monitor electrónico

- [ ] Dejar correr un ciclo completo de medición automática del monitor.
- [ ] Cargar el resultado en **Verificación → NIBP electrónico**.
- [ ] Repetir hasta tener n≥5 mediciones — la app calcula error medio y DS
      contra AAMI SP10 (±5 mmHg medio, ≤8 mmHg DS) y marca
      APROBADO/REPROBADO solo.

## 5. NIBP — tensiómetro aneroide

- [ ] Conectar la manguera del aneroide al sensor de presión (T).
- [ ] Entrar a **Verificación → Aneroide** (esto desactiva el solenoide
      automáticamente).
- [ ] Probar al menos 3 puntos de la escala (ej: 50, 100, 150, 200 mmHg):
      inflar a mano, leer la aguja, cargar el valor — la referencia del SEM
      se captura sola.
- [ ] Tolerancia: ±3 mmHg por punto. Si algún punto falla, no dar por buena
      la aguja de ese tensiómetro.

## 6. Temperatura (si hay sonda real conectada)

- [ ] Confirmar que el valor que muestra el monitor coincide con la
      referencia real (DS18B20) dentro de tolerancia.

## 7. Al volver

- [ ] Guardar/exportar lo cargado en Verificación para ese equipo
      (queda como registro de que se probó y con qué resultado).
- [ ] Si algo no cerró dentro de tolerancia, no es un "quizás" — anotarlo
      en `RIESGOS.md` si se sospecha que es un problema del simulador y no
      del monitor bajo prueba.
