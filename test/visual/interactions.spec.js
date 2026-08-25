const { test, expect } = require("@playwright/test");
const { preparePage, stabilizeVisuals } = require("./helpers");

test("publications omit Abs controls when BibTeX entries have no abstracts", async ({ page }) => {
  await preparePage(page, "light");
  const response = await page.goto("/al-folio/publications/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Publications", exact: true })).toBeVisible();
  expect(await page.locator(".bibliography li").count()).toBeGreaterThan(0);
  await expect(page.getByRole("button", { name: "Abs", exact: true })).toHaveCount(0);
  await expect(page.locator(".abstract")).toHaveCount(0);
});

test("publication popover works without bootstrap compat runtime", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto("/al-folio/publications/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const popoverTrigger = page.locator('[data-toggle="popover"]').first();
  test.skip((await popoverTrigger.count()) === 0, "no popover trigger found in fixture data");

  await popoverTrigger.hover();
  await expect(page.locator(".af-popover")).toBeVisible();
});

test("mobile navbar can expand/collapse", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only navigation behavior");

  await preparePage(page, "light");
  await page.goto("/al-folio/", { waitUntil: "networkidle" });

  const toggle = page.locator(".navbar-toggler").first();
  await expect(toggle).toBeVisible();

  const nav = page.locator(".navbar-collapse").first();
  await toggle.click();
  await expect(nav).toHaveClass(/show/);

  await toggle.click();
  await expect(nav).not.toHaveClass(/show/);
});

test("removed repositories demo route stays unavailable", async ({ page }) => {
  await preparePage(page, "light");
  const response = await page.goto("/al-folio/repositories/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(404);
  await expect(page.locator('img[src*="github-stats-extended"]')).toHaveCount(0);
  await expect(page.locator('img[src*="github-readme-stats"]')).toHaveCount(0);
  await expect(page.locator('img[src*="github-profile-trophy"]')).toHaveCount(0);
});

test("removed blog demo route stays unavailable", async ({ page }) => {
  await preparePage(page, "light");
  const response = await page.goto("/al-folio/blog/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(404);
  await expect(page.locator(".af-pagination")).toHaveCount(0);
  await expect(page.locator(".af-page-link")).toHaveCount(0);
});

test("navbar menu stays right-aligned on desktop pages", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "desktop-only alignment contract");

  await preparePage(page, "light");
  await page.goto("/al-folio/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const alignment = await page.evaluate(() => {
    const container = document.querySelector("#navbar .container");
    const menu = document.querySelector("#navbarNav .navbar-menu-list");
    if (!container || !menu) {
      return null;
    }
    const containerBox = container.getBoundingClientRect();
    const menuBox = menu.getBoundingClientRect();
    return {
      containerRight: containerBox.right,
      menuRight: menuBox.right,
    };
  });

  expect(alignment).not.toBeNull();
  expect(Math.abs(alignment.menuRight - alignment.containerRight)).toBeLessThanOrEqual(24);
});

test("navbar search button opens modal and toggle buttons use pointer cursor", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "navbar search/theme controls are collapsed under mobile menu");

  await preparePage(page, "light");
  await page.goto("/al-folio/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  await page.evaluate(() => {
    const ninjaKeys = document.querySelector("ninja-keys");
    if (!ninjaKeys || typeof ninjaKeys.open !== "function") {
      return;
    }
    ninjaKeys.__openCalled = false;
    const originalOpen = ninjaKeys.open.bind(ninjaKeys);
    ninjaKeys.open = () => {
      ninjaKeys.__openCalled = true;
      return originalOpen();
    };
  });

  await page.click("#search-toggle");
  const modalOpened = await page.evaluate(() => Boolean(document.querySelector("ninja-keys")?.__openCalled));
  expect(modalOpened).toBeTruthy();

  const searchCursor = await page.locator("#search-toggle").evaluate((el) => window.getComputedStyle(el).cursor);
  const themeCursor = await page.locator("#light-toggle").evaluate((el) => window.getComputedStyle(el).cursor);
  expect(searchCursor).toBe("pointer");
  expect(themeCursor).toBe("pointer");
});

test("removed tables demo post does not expose related-post fixtures", async ({ page }) => {
  await preparePage(page, "light");
  const response = await page.goto("/al-folio/blog/2023/tables/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Enjoy Reading This Article?" })).toHaveCount(0);
});

test("removed table-of-contents demo post does not expose inline-code fixtures", async ({ page }) => {
  await preparePage(page, "light");
  const response = await page.goto("/al-folio/blog/2023/sidebar-table-of-contents/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(404);
  await expect(page.locator("main code, [role='main'] code")).toHaveCount(0);
});

test("projects use the current production hierarchy without demo hover cards", async ({ page }) => {
  await preparePage(page, "light");
  const response = await page.goto("/al-folio/projects/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Featured Projects", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "All Projects", exact: true })).toBeVisible();
  await expect(page.locator(".projects .hoverable")).toHaveCount(0);
});

test("removed teaching demo route stays unavailable", async ({ page }) => {
  await preparePage(page, "light");
  const response = await page.goto("/al-folio/teaching/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(404);
  await expect(page.locator("#calendar-toggle-btn")).toHaveCount(0);
  await expect(page.locator("#calendar-container")).toHaveCount(0);
});

test("removed table-of-contents demo post does not expose a TOC fixture", async ({ page }) => {
  await preparePage(page, "light");
  const response = await page.goto("/al-folio/blog/2023/sidebar-table-of-contents/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(404);
  await expect(page.locator("#toc-sidebar")).toHaveCount(0);
  await expect(page.locator("#toc-sidebar .toc-link")).toHaveCount(0);
});

test("removed tables demo post does not expose pretty-table fixtures", async ({ page }) => {
  await preparePage(page, "light");
  const response = await page.goto("/al-folio/blog/2023/tables/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(404);
  await expect(page.locator('table[data-search="true"]')).toHaveCount(0);
  await expect(page.locator(".af-table-search")).toHaveCount(0);
});

test("removed photo-gallery demo post does not expose lightbox fixtures", async ({ page }) => {
  await preparePage(page, "light");
  const response = await page.goto("/al-folio/blog/2024/photo-gallery/", { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  expect(response).not.toBeNull();
  expect(response.status()).toBe(404);
  await expect(page.locator("a[data-lightbox]")).toHaveCount(0);
  await expect(page.locator(".al-lightbox-overlay")).toHaveCount(0);
});

test("core pages no longer emit jQuery-style runtime errors", async ({ page }) => {
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      failures.push(message.text());
    }
  });

  await preparePage(page, "light");
  const pages = ["/al-folio/", "/al-folio/projects/", "/al-folio/blog/2024/photo-gallery/", "/al-folio/blog/2023/tables/"];

  for (const target of pages) {
    await page.goto(target, { waitUntil: "networkidle" });
    await stabilizeVisuals(page);
  }

  const jqueryFailures = failures.filter((message) => /\$\s*is not defined|lightbox/i.test(message));
  expect(jqueryFailures).toEqual([]);
});
