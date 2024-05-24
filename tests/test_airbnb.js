const { Builder, By, Key, until } = require("selenium-webdriver");

async function testAirbnbSearch() {
    let driver = await new Builder().forBrowser("firefox").build();

    try {
        await driver.manage().window().setRect({ width: 375, height: 812 });

        await driver.get("https://www.airbnb.com");

        await driver.wait(until.elementLocated(By.css('[data-testid="little-search-card-SearchInput"]')), 10000);

        let destinationInput = await driver.findElement(By.css('[data-testid="bigsearch-query-location-input"]'));
        await destinationInput.sendKeys("Paris");

        await driver.findElement(By.css('[data-testid="structured-search-input-field-split-dates-0"]')).click();
        await driver.findElement(By.css('[data-testid="datepicker-day-2023-05-20"]')).click();
        await driver.findElement(By.css('[data-testid="datepicker-day-2023-05-27"]')).click();

        await driver.findElement(By.css('[data-testid="structured-search-input-field-guests-button"]')).click();
        await driver.findElement(By.css('[data-testid="stepper-adults-increase-button"]')).click();
        await driver.findElement(By.css('[data-testid="stepper-children-increase-button"]')).click();

        await driver.findElement(By.css('[data-testid="structured-search-input-search-button"]')).click();

        await driver.wait(until.elementLocated(By.css('[data-testid="listing-card"]')), 20000);

        console.log("Recherche de logement réussie !");

    } catch (e) {
        console.error("Une erreur est survenue :", e);

    } finally {
        await driver.quit();
    }
}

testAirbnbSearch();
