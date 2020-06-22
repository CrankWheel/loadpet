const { Cluster } = require('puppeteer-cluster');

function PromiseTimeout(delayms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delayms);
    });
}

var num = process.argv[2];
var url = process.argv[3];

var index = 1;

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: num,
    timeout: 3600000
    
    , puppeteerOptions: {headless: false}
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    var myIndex = index++;
    console.log("I am browser #" + myIndex + " now waiting on " + url);
    await PromiseTimeout(3600000);
    await page.waitForNavigation();
    console.log(await page.title());
  });

  for (var i = 0; i < num; ++i) {
    cluster.queue(url.replace('{{NUMBER}}', '' + i));
  }

  await cluster.idle();
  await cluster.close();
})();
