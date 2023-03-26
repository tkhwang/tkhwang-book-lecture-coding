const download = (url, savepath, callback) => {
  const http = require("http");
  const fs = require("fs");
  const outfile = fs.createWriteStream(savepath);

  const req = http.get(url, (res) => {
    res.pipe(outfile);
    res.on("end", () => {
      outfile.close();
      console.log("[+] done");
    });
  });
};

download("http://jpub.tistory.com/529", "spring.html", () => {
  console.log("[+] done: sprint");
});

download("http://jpub.tistory.com/537", "angular.html", () => {
  console.log("[+] done: angular");
});
