import schedule from 'node-schedule';
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import si from 'systeminformation';
import dotenv from 'dotenv';

dotenv.config();

// Replace this with your home Wi-Fi network SSID
const homeNetworkSSID = process.env.SSID;



// Path to store the last print time
const lastPrintFilePath = path.join('lastPrintTime.txt');
// Path to the PDF file for test print
const pdfFilePath = path.join('print-test.pdf');

// Function to print the test PDF
function printTestPDF() {
    exec(`lp ${pdfFilePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error printing file: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Printing stderr: ${stderr}`);
            return;
        }
        console.log(`Printed successfully: ${stdout}`);
        fs.writeFile(lastPrintFilePath, new Date().toISOString());
    });
}

// Function to check the last print time
async function checkLastPrint() {
    try {
        const data = await fs.readFile(lastPrintFilePath, 'utf8');
        console.log('Raw Last Print Time from file:', data);

        // Trim any extra whitespace/newline characters
        const trimmedData = data.trim();
        const lastPrintDate = new Date(trimmedData);
        console.log('Parsed Last Print Date:', lastPrintDate);

        if (isNaN(lastPrintDate)) {
            throw new Error('Invalid date value');
        }

        const currentTime = new Date();
        const timeDiff = currentTime - lastPrintDate;

        console.log('Time difference in milliseconds:', timeDiff);

        // Set some threshold for time difference, for example, one week in milliseconds
        const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

        if (timeDiff > oneWeekInMilliseconds) {
            console.log('It has been too long since the last print.');
            printTestPDF();  // Print the PDF if it's been too long
        } else {
            console.log('Last print was recent.');
        }
    } catch (err) {
        console.error('Error checking last print time:', err);
    }
}

// Function to check if connected to the home network
async function isConnectedToHomeNetwork() {
    try {
        const wifiConnections = await si.wifiConnections();
        console.log('Detected Wi-Fi Connections:', wifiConnections);  // Debugging line
        const currentConnection = wifiConnections.find(connection => connection.ssid === homeNetworkSSID);
        console.log('Current SSID:', currentConnection ? currentConnection.ssid : 'Not found'); // Debugging line
        return currentConnection && currentConnection.ssid === homeNetworkSSID;
    } catch (error) {
        console.error('Error getting Wi-Fi name:', error);
        return false;
    }
}

// Main function to check the network and then the last print time
async function main() {
    if (await isConnectedToHomeNetwork()) {
        await checkLastPrint();
    } else {
        console.log('Not connected to home network, skipping print.');
    }
}

// Schedule the job to run every hour
schedule.scheduleJob('0 * * * *', main);

// Run the initial check
main();

// Script to set the last print time to exactly one week ago (for testing purposes)
async function setLastPrintToOneWeekAgo() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoISOString = oneWeekAgo.toISOString();

    await fs.writeFile(lastPrintFilePath, oneWeekAgoISOString);
    console.log('Written Date (one week ago):', oneWeekAgoISOString);
}

// Uncomment the following line to set the last print time to one week ago for testing
// setLastPrintToOneWeekAgo();
