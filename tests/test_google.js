const { Builder, By, Key, until } = require("selenium-webdriver");
require("geckodriver");

(async function test_google() {
    let driver = await new Builder().forBrowser("firefox").build();

    try {
        await driver.get("https://www.google.com");

        let searchBox = await driver.findElement(By.name("q"));
        await searchBox.sendKeys("Votre requête de recherche ici", Key.ENTER);

        await driver.wait(until.titleIs('Votre requête de recherche ici - Google Search'), 10000);
        const title = await driver.getTitle();
        console.log("Title:", title);

        if (title === 'Votre requête de recherche ici - Google Search') {
            console.log("Test réussi!");
        } else {
            throw new Error("Le titre de la page ne correspond pas à la recherche.");
        }

    } catch (e) {
        console.error("Une erreur est survenue :", e);

    } finally {
        await driver.quit();
    }

    setInterval(function () {
        driver.quit();
    }, 10000);
})();
