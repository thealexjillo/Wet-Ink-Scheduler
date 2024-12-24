# Wet Ink Scheduler

---
## Description
**Wet Ink Scheduler** is an automated scheduling app designed to prevent inkjet printers from drying out due to inactivity. The app runs periodic test prints and monitors the time since the last print, ensuring your printer remains in good working condition. It checks for a connection to a designated Wi-Fi network and schedules print jobs weekly if necessary.

---

## The Problem
Inkjet printers, when left unused for extended periods, often face issues like dried-out ink cartridges or clogged nozzles. This leads to poor print quality, expensive replacements, and unnecessary frustration for users.
Additionally, manual maintenance and remembering to perform test prints can be inconvenient and unreliable.

Like many others, I own a budget-friendly inkjet printer for the rare occasion I need to print something. After replacing nearly full but dried-out ink cartridges twice, I decided to create a solution to prevent this problem from happening again.



---

## The Solution
**Wet Ink Scheduler** automates printer maintenance by:
- Scheduling periodic test prints to keep the printer in optimal condition.
- Checking the last print date and ensuring that maintenance is performed only when needed.
- Verifying the device is connected to the correct network before initiating any prints.



---

## Features
- **Automated Test Printing**: Schedules a test print if the printer has been inactive for more than a week.
- **Wi-Fi Network Detection**: Ensures the device is connected to a specified home Wi-Fi network before initiating a print job.
- **Flexible Scheduling**: Runs hourly checks and prints only when needed.
- **Error Handling**: Logs and handles errors gracefully during print execution and file handling.

---

