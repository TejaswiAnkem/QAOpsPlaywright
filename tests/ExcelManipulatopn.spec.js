import ExcelJS from 'exceljs';
import {test,expect} from '@playwright/test';


async function writeExcelTest(searchText, replaceText,change, filePath) {

    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet('Sheet1');

    const output = readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column+change.colChange);

    cell.value = replaceText;

    await workbook.xlsx.writeFile(filePath);
}

function readExcel(worksheet, searchText) {

    const output = { row: -1, column: -1 };

    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {

            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }

        });

    });

    return output;
}

writeExcelTest(
    "Rabbit",
    "350",
    {rowChange:0, colChange:2},
    "C:/Users/EV-IN-LP-0171/Downloads/download (2).xlsx"
);

test('Upload download excel validation', async ({ page }) => {

    const textSearch = 'Mango';
    const updateValue = '350';

    await page.goto(
        'https://rahulshettyacademy.com/upload-download-test/index.html'
    );

    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('button', { name: 'Download' }).click();

    const download = await downloadPromise;

    const filePath =
        'C:/Users/EV-IN-LP-0171/Downloads/test-download.xlsx';

    await download.saveAs(filePath);

    await writeExcelTest(
        textSearch,
        updateValue,
        { rowChange: 0, colChange: 2 },
        filePath
    );

    await page.locator('#fileinput').setInputFiles(filePath);

    const desiredRow = page
        .getByRole('row')
        .filter({ hasText: textSearch });

    await expect(desiredRow).toContainText(updateValue);
});
