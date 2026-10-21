
const { spawn } = require("child_process");

const backendPath = "/home/container/server/server";

const child = spawn(
  "/usr/local/bin/npm",
  ["start", "--prefix", backendPath],
  {
    stdio: "inherit",
    shell: false,
  }
);

child.on("error", (error) => {
  console.error("Backend startup failed:", error);
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
