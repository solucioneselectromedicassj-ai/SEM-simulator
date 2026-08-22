# SEM Simulator — Simulador de Paciente

**Soluciones Electromédicas SJ**

Simulador de signos vitales para verificación y calibración de monitores multiparamétricos y tensiómetros digitales.

## Parámetros simulados

| Parámetro | Rango | Norma |
|-----------|-------|-------|
| ECG | 7 ritmos + señales de calibración | — |
| NIBP | SYS 60–260 / DIA 30–160 mmHg | AAMI SP10 / ISO 81060-2 |
| SpO₂ | 50–100% | ISO 9919 |
| Temperatura | 32–42°C | IEC 60601-2-56 |
| FC | 20–200 bpm | — |
| Respiración | 4–60 rpm | — |

## Programas clínicos

Normal · Hipertensión I/II/III · Hipotensión/Shock · Bradicardia · Taquicardia · FA · Flutter · TV · FV · Asistolia · Marcapasos · Pediátrico · Neonato · Hipoxemia · Fiebre

## Señales de calibración ECG

- Onda cuadrada / senoidal / triangular
- Amplitud configurable: 0.1 – 2.0 mV
- Segmento ST: -0.50 a +0.50 mV

## Saturómetría

Soporte de protocolos: **Nellcor OxiMax · BCI · Masimo LNOP**

## Conexión ESP32

La app se conecta vía WiFi/WebSocket al hardware ESP32 para control de:
- NIBP (MPX5100 + microválvula)
- Temperatura (DS18B20)
- SpO₂ (futuro)
- ECG (futuro – MCP4725 DAC)

## Deploy

```
Vercel → conectar repo → deploy automático
```

## Stack

Single HTML file · React 18 CDN · Sin dependencias de build
