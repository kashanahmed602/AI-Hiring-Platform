const { spawn } = require("child_process");

const child = spawn("npm", ["start", "--prefix", "./server"], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});