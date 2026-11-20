// ======================================================
// ZÍSKÁNÍ ID Z URL
// ======================================================

const params =
    new URLSearchParams(
        window.location.search
    );

const id =
    Number(
        params.get("id")
    );

// ======================================================
// NAČTENÍ MAJETKU
// ======================================================

const assets =
    JSON.parse(
        localStorage.getItem(
            "assets"
        )
    ) || [];

// ======================================================
// HLEDÁNÍ POLOŽKY
// ======================================================

const item =
    assets.find(
        asset => asset.id === id
    );

// ======================================================
// ODKAZY NA PRVKY
// ======================================================

const detailView =
    document.getElementById(
        "detail-view"
    );

const editView =
    document.getElementById(
        "edit-view"
    );

const editButton =
    document.getElementById(
        "edit-asset"
    );

const cancelButton =
    document.getElementById(
        "cancel-edit"
    );

const saveButton =
    document.getElementById(
        "save-edit"
    );

const saveMessage =
    document.getElementById(
        "save-message"
    );
    
const addDocumentButton =
    document.getElementById(
        "add-document"
    );

const documentUpload =
    document.getElementById(
        "document-upload"
    );

const documentsList =
    document.getElementById(
        "documents-list"
    );

// ======================================================
// AKTUALIZACE DETAILU
// ======================================================

function aktualizujDetail(){

    if(!item){
        return;
    }

    document.getElementById(
        "detail-name"
    ).textContent =
        item.name;

    document.getElementById(
        "detail-category"
    ).textContent =
        item.category;

    document.getElementById(
        "detail-price"
    ).textContent =
        Number(item.price)
            .toLocaleString("cs-CZ")
        + " "
        + item.currency;

    document.getElementById(
        "detail-date"
    ).textContent =
        item.purchaseDate;

    document.getElementById(
        "detail-warranty"
    ).textContent =
        item.warrantyMonths
        + " měsíců";

    document.getElementById(
        "detail-seller"
    ).textContent =
        item.seller || "-";

    document.getElementById(
        "detail-serial"
    ).textContent =
        item.serialNumber || "-";

    document.getElementById(
        "detail-note"
    ).textContent =
        item.note || "-";

}

// ======================================================
// PRVNÍ VYKRESLENÍ
// ======================================================

if(item){

    aktualizujDetail();

}

// ======================================================
// PŘEPNUTÍ DO EDITACE
// ======================================================

if(editButton){

    editButton.addEventListener(
        "click",
        function(){

            detailView.classList.add(
                "hidden"
            );

            editView.classList.remove(
                "hidden"
            );

            document.getElementById(
                "edit-name"
            ).value =
                item.name || "";

            document.getElementById(
                "edit-category"
            ).value =
                item.category || "";

            document.getElementById(
                "edit-price"
            ).value =
                item.price || "";

            document.getElementById(
                "edit-currency"
            ).value =
                item.currency || "Kč";

            document.getElementById(
                "edit-date"
            ).value =
                item.purchaseDate || "";

            document.getElementById(
                "edit-warranty"
            ).value =
                item.warrantyMonths || "";

            document.getElementById(
                "edit-seller"
            ).value =
                item.seller || "";

            document.getElementById(
                "edit-serial"
            ).value =
                item.serialNumber || "";

            document.getElementById(
                "edit-note"
            ).value =
                item.note || "";

        }
    );

}

// ======================================================
// ZRUŠENÍ EDITACE
// ======================================================

if(cancelButton){

    cancelButton.addEventListener(
        "click",
        function(){

            editView.classList.add(
                "hidden"
            );

            detailView.classList.remove(
                "hidden"
            );

        }
    );

}

// ======================================================
// ULOŽENÍ ZMĚN
// ======================================================

if(saveButton){

    saveButton.addEventListener(
        "click",
        function(){

            item.name =
                document.getElementById(
                    "edit-name"
                ).value;

            item.category =
                document.getElementById(
                    "edit-category"
                ).value;

            item.price =
                Number(
                    document.getElementById(
                        "edit-price"
                    ).value
                );

            item.currency =
                document.getElementById(
                    "edit-currency"
                ).value;

            item.purchaseDate =
                document.getElementById(
                    "edit-date"
                ).value;

            item.warrantyMonths =
                Number(
                    document.getElementById(
                        "edit-warranty"
                    ).value
                );

            item.seller =
                document.getElementById(
                    "edit-seller"
                ).value;

            item.serialNumber =
                document.getElementById(
                    "edit-serial"
                ).value;

            item.note =
                document.getElementById(
                    "edit-note"
                ).value;

            localStorage.setItem(
                "assets",
                JSON.stringify(
                    assets
                )
            );

            aktualizujDetail();

            editView.classList.add(
                "hidden"
            );

            detailView.classList.remove(
                "hidden"
            );

            if(saveMessage){

                saveMessage.classList.remove(
                    "hidden"
                );

                setTimeout(
                    function(){

                        saveMessage.classList.add(
                            "hidden"
                        );

                    },
                    3000
                );

            }

        }
    );

}

// ======================================================
// SMAZÁNÍ POLOŽKY
// ======================================================

const deleteButton =
    document.getElementById(
        "delete-asset"
    );

const deleteModal =
    document.getElementById(
        "delete-modal"
    );

const deleteItemName =
    document.getElementById(
        "delete-item-name"
    );

const cancelDelete =
    document.getElementById(
        "cancel-delete"
    );

const confirmDelete =
    document.getElementById(
        "confirm-delete"
    );

if(deleteButton){

    deleteButton.addEventListener(
        "click",
        function(){

            deleteItemName.textContent =
                item.name;

            deleteModal.classList.remove(
                "hidden"
            );

        }
    );

}

if(cancelDelete){

    cancelDelete.addEventListener(
        "click",
        function(){

            deleteModal.classList.add(
                "hidden"
            );

        }
    );

}

if(confirmDelete){

    confirmDelete.addEventListener(
        "click",
        function(){

            const novySeznam =
                assets.filter(
                    asset =>
                        asset.id !== item.id
                );

            localStorage.setItem(
                "assets",
                JSON.stringify(
                    novySeznam
                )
            );

            window.location.href =
                "majetek.html";

        }
    );

}

function showSaveToast() {
    const toast = document.getElementById("save-toast");

    toast.classList.remove("hidden");

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 3000);
}

if(addDocumentButton){

    addDocumentButton.addEventListener(
        "click",
        function(){

            documentUpload.click();

        }
    );
}

if(documentUpload){

    documentUpload.addEventListener(
        "change",
        function(event){

            const file =
                event.target.files[0];

            if(!file){
                return;
            }

console.log(file);

            const reader =
                new FileReader();

            reader.onload =
                function(e){

                    item.documents.push({

                        id: Date.now(),

                        name: file.name,

                        type: file.type,

                        data: e.target.result

                    });

                    localStorage.setItem(
                        "assets",
                        JSON.stringify(
                            assets
                        )
                    );

                    console.log(
                        item.documents
                    );
                };

            reader.readAsDataURL(
                file
            );
        }
    );
}