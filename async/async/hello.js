async function a1() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  })
}

async function a2() {
  await a1();
  console.log("hello world");
}

a2()
