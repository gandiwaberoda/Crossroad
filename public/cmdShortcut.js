const cmdInput = document.getElementById("cmdInput")

document.getElementById("cmdKirim").addEventListener("click", () => {
    BroadcastAll(cmdInput.value);
})
document.getElementById("cmdIdle").addEventListener("click", () => {
    BroadcastAll("all:idle");
})
document.getElementById("cmdGetball").addEventListener("click", () => {
    BroadcastAll("all:getball");
})
document.getElementById("cmdWatchat").addEventListener("click", () => {
    BroadcastAll("all:watchat(ball)");
})
document.getElementById("cmdW").addEventListener("click", () => {
    BroadcastAll("all:w");
})
document.getElementById("cmdA").addEventListener("click", () => {
    BroadcastAll("all:a");
})
document.getElementById("cmdS").addEventListener("click", () => {
    BroadcastAll("all:s");
})
document.getElementById("cmdD").addEventListener("click", () => {
    BroadcastAll("all:d");
})
document.getElementById("cmdResetOdo").addEventListener("click", () => {
    BroadcastAll("all:fwd(*a,0,0,0,0,0,1#)");
})
