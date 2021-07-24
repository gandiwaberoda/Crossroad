const cmdInput = document.getElementById("cmdInput")

document.getElementById("cmdKirim").addEventListener("click", () => {
    BroadcastAll(cmdInput.value);
})
