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

if(item){

    if(!item.documents){
        item.documents = [];
    }

    if(!item.photos){
        item.photos = [];
    }

}

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
    
    console.log(documentUpload);

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
    vykresliDokumenty();

}

function otevriDokument(id){

    const dokument =
        item.documents.find(
            doc => doc.id === id
        );

    if(!dokument){
        return;
    }

    const noveOkno =
        window.open();

    noveOkno.document.write(`

        <iframe
            src="${dokument.data}"
            width="100%"
            height="100%"
            style="
                border:none;
                position:fixed;
                top:0;
                left:0;
            ">
        </iframe>

    `);
}

function smazDokument(id){

    item.documents =
        item.documents.filter(
            doc => doc.id !== id
        );

    localStorage.setItem(
        "assets",
        JSON.stringify(
            assets
        )
    );

    vykresliDokumenty();
}

function otevriFotku(id){

    const foto =
        item.photos.find(
            photo => photo.id === id
        );

    if(!foto){
        return;
    }

    document.getElementById(
        "photo-preview"
    ).src = foto.data;

    document.getElementById(
        "photo-modal"
    ).classList.remove(
        "hidden"
    );
}

function smazFotku(id){

    item.photos =
        item.photos.filter(
            photo => photo.id !== id
        );

    console.log(
        "Photo size:",
        Math.round(
            compressed.length / 1024
        ),
        "kB"
    );

    localStorage.setItem(
        "assets",
        JSON.stringify(
            assets
        )
    );

    vykresliDokumenty();
}


const photoModal =
    document.getElementById(
        "photo-modal"
    );

if(photoModal){

    photoModal.addEventListener(
        "click",
        function(){

            photoModal.classList.add(
                "hidden"
            );

        }
    );
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
            
            vykresliDokumenty();
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

// ======================================================
// Komprese obrázků
// ======================================================


async function zmensiObrazek(file){

    return new Promise((resolve) => {

        const reader =
            new FileReader();

        const img =
            new Image();

        reader.onload = async function(e){

            img.src =
                e.target.result;
        };

        img.onload = function(){

            const canvas =
                document.createElement(
                    "canvas"
                );

            let width =
                img.width;

            let height =
                img.height;

            const maxSize = 1600;

            if(width > height){

                if(width > maxSize){

                    height =
                        height *
                        (maxSize / width);

                    width =
                        maxSize;
                }
            }
            else{

                if(height > maxSize){

                    width =
                        width *
                        (maxSize / height);

                    height =
                        maxSize;
                }
            }

            canvas.width =
                width;

            canvas.height =
                height;

            const ctx =
                canvas.getContext(
                    "2d"
                );

            ctx.drawImage(
                img,
                0,
                0,
                width,
                height
            );

            resolve(
                canvas.toDataURL(
                    "image/jpeg",
                    0.8
                )
            );
        };

        reader.readAsDataURL(
            file
        );
    });
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

            const fileData = {

                    id: Date.now(),

                    name: file.name,

                    type: file.type,

                    data: e.target.result

                };

if(file.type.startsWith("image/")){

    zmensiObrazek(file)
    .then(compressed => {
    
console.log(
    "KOMPRESOVANO",
    compressed.length
);

        item.photos.push({

            id: Date.now(),

            name: file.name,

            type: file.type,

            data: compressed

        });

        localStorage.setItem(
            "assets",
            JSON.stringify(
                assets
            )
        );

        vykresliDokumenty();

    });

}

else{

    item.documents.push(fileData);

}

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

function vykresliDokumenty(){

    console.log(
        "VYKRESLUJI",
        item.documents.length,
        item.photos.length
        );

    const documentsColumn =
        document.getElementById(
            "documents-column"
        );

    const photosColumn =
        document.getElementById(
            "photos-column"
        );

    documentsColumn.innerHTML = "";
    photosColumn.innerHTML = "";

    item.documents.forEach(doc => {

        documentsColumn.innerHTML += `

    <div class="document-item">

        <span
            onclick="otevriDokument(${doc.id})">

            📄 ${doc.name}

        </span>

        <span
            class="delete-document"
            onclick="smazDokument(${doc.id})">

            🗑

        </span>

    </div>

`;

    });

item.photos.forEach(photo => {

    photosColumn.innerHTML += `

    <div class="photo-wrapper">

        <div
            class="photo-thumb"
            onclick="otevriFotku(${photo.id})">

            <img
                src="${photo.data}"
                alt="${photo.name}">

        </div>

        <span
            class="delete-photo"
            onclick="smazFotku(${photo.id})">

            🗑

        </span>

    </div>
`;

});

    if(
        item.documents.length === 0 &&
        item.photos.length === 0
    ){

        documentsColumn.innerHTML =
            `<p class="documents-empty">
                Žádné přílohy.
            </p>`;
    }
}