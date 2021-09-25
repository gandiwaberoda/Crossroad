document.getElementById("cmdKirim").addEventListener("click", () => {
    BroadcastCommand(cmdInput.value);
})
document.getElementById("cmdIdle").addEventListener("click", () => {
    window.BroadcastCommand("all:idle");
})
document.getElementById("cmdGetball").addEventListener("click", () => {
    BroadcastCommand("all:getball");
})
document.getElementById("cmdWatchat").addEventListener("click", () => {
    BroadcastCommand("all:watchat(ball)");
})
document.getElementById("cmdW").addEventListener("click", () => {
    BroadcastCommand("all:w");
})
document.getElementById("cmdA").addEventListener("click", () => {
    BroadcastCommand("all:a");
})
document.getElementById("cmdS").addEventListener("click", () => {
    BroadcastCommand("all:s");
})
document.getElementById("cmdD").addEventListener("click", () => {
    BroadcastCommand("all:d");
})
document.getElementById("cmdResetOdo").addEventListener("click", () => {
    BroadcastCommand("all:respos");
})
