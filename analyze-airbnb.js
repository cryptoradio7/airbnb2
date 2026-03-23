const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to Airbnb...');
  await page.goto('https://www.airbnb.fr', { waitUntil: 'networkidle' });
  
  // Take screenshot of homepage
  await page.screenshot({ path: '/tmp/airbnb-reference.png', fullPage: false });
  console.log('Screenshot saved to /tmp/airbnb-reference.png');
  
  // Extract colors from CSS
  const colors = await page.evaluate(() => {
    const elements = document.querySelectorAll('*');
    const colorMap = new Map();
    
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;
      const color = style.color;
      const border = style.borderColor;
      
      [bg, color, border].forEach(c => {
        if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') {
          colorMap.set(c, (colorMap.get(c) || 0) + 1);
        }
      });
    });
    
    // Get most common colors
    return Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([color, count]) => ({ color, count }));
  });
  
  console.log('\nTop colors from Airbnb:');
  colors.forEach((c, i) => {
    console.log(`${i + 1}. ${c.color} (${c.count} occurrences)`);
  });
  
  // Extract header structure
  const header = await page.evaluate(() => {
    const headerEl = document.querySelector('header');
    if (!headerEl) return null;
    
    return {
      html: headerEl.outerHTML.substring(0, 500) + '...',
      height: headerEl.offsetHeight,
      backgroundColor: window.getComputedStyle(headerEl).backgroundColor,
    };
  });
  
  console.log('\nHeader info:', header);
  
  // Extract search bar
  const searchBar = await page.evaluate(() => {
    const search = document.querySelector('[data-testid="header-tab-search-bar"]') || 
                   document.querySelector('form[role="search"]');
    if (!search) return null;
    
    return {
      html: search.outerHTML.substring(0, 300) + '...',
      borderRadius: window.getComputedStyle(search).borderRadius,
      boxShadow: window.getComputedStyle(search).boxShadow,
    };
  });
  
  console.log('\nSearch bar:', searchBar);
  
  await browser.close();
  console.log('\nAnalysis complete. Check /tmp/airbnb-reference.png');
})();