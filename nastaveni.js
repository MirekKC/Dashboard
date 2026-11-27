// ======================================================
// NAČTENÍ DAT
// ======================================================

const assets =
    JSON.parse(
        localStorage.getItem(
            "assets"
        )
    ) || [];

// ======================================================
// ODKAZY NA PRVKY
// ======================================================

const assetCount =
    document.getElementById(
        "asset-count"
    );

const documentCount =
    document.getElementById(
        "document-count"
    );

const photoCount =
    document.getElementById(
        "photo-count"
    );

const storageSize =
    document.getElementById(
        "storage-size"
    );

const exportButton =
    document.getElementById(
        "export-data"
    );

const importButton =
    document.getElementById(
        "import-data"
    );

const importFile =
    document.getElementById(
        "import-file"
    );

const lastBackup =
    document.getElementById(
        "last-backup"
    );

// ======================================================
// STATISTIKY
// ======================================================

function aktualizujStatistiky(){

    let dokumenty = 0;

    let fotografie = 0;

    assets.forEach(asset => {

        dokumenty +=
            asset.documents
                ? asset.documents.length
                : 0;

        fotografie +=
            asset.photos
                ? asset.photos.length
                : 0;

    });

    assetCount.textContent =
        assets.length;

    documentCount.textContent =
        dokumenty;

    photoCount.textContent =
        fotografie;

    const size =
        JSON.stringify(
            assets
        ).length;

    if(size > 1024 * 1024){

        storageSize.textContent =
            (
                size /
                1024 /
                1024
            ).toFixed(2) +
            " MB";

    }
    else{

        storageSize.textContent =
            Math.round(
                size / 1024
            ) +
            " kB";

    }
}

// ======================================================
// POSLEDNÍ EXPORT
// ======================================================

function zobrazPosledniExport(){

    const datum =
        localStorage.getItem(
            "lastBackup"
        );

    if(!datum){

        return;
    }

    lastBackup.textContent =
        "Poslední export: " +
        new Date(datum)
            .toLocaleString(
                "cs-CZ"
            );
}

// ======================================================
// EXPORT
// ======================================================

if(exportButton){

    exportButton.addEventListener(
        "click",
        function(){

            const data =
                localStorage.getItem(
                    "assets"
                );

            const blob =
                new Blob(
                    [data],
                    {
                        type:
                        "application/json"
                    }
                );

            const url =
                URL.createObjectURL(
                    blob
                );

            const link =
                document.createElement(
                    "a"
                );

            link.href = url;

            const now =
    new Date();

const timestamp =

    now.getFullYear() +

    "-" +

    String(
        now.getMonth() + 1
    ).padStart(2, "0") +

    "-" +

    String(
        now.getDate()
    ).padStart(2, "0") +

    "-" +

    String(
        now.getHours()
    ).padStart(2, "0") +

    String(
        now.getMinutes()
    ).padStart(2, "0");

link.download =

    `domaci-hlidac-backup-${timestamp}.json`;

            link.click();

            URL.revokeObjectURL(
                url
            );

            localStorage.setItem(
                "lastBackup",
                new Date()
                    .toISOString()
            );

            zobrazPosledniExport();

        }
    );
}

// ======================================================
// OTEVŘENÍ IMPORTU
// ======================================================

if(importButton){

    importButton.addEventListener(
        "click",
        function(){

            importFile.click();

        }
    );
}

// ======================================================
// IMPORT
// ======================================================

if(importFile){

    importFile.addEventListener(
        "change",
        function(event){

            const file =
                event.target.files[0];

            if(!file){
                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                function(e){

                    try{

                        const importedData =
                            JSON.parse(
                                e.target.result
                            );

            const potvrzeni =
                confirm(

                    "Import přepíše veškerá aktuální data.\n\n" +

                    "Pokračovat?"

                );

            if(!potvrzeni){

                return;

            }

                        localStorage.setItem(
                            "assets",
                            JSON.stringify(
                                importedData
                            )
                        );

                        alert(
                            "Import byl úspěšně dokončen."
                        );

                        location.reload();

                    }
                    catch{

                        alert(
                            "Neplatný soubor zálohy."
                        );

                    }

                };

            reader.readAsText(
                file
            );

        }
    );
}

// ======================================================
// PRVNÍ NAČTENÍ
// ======================================================

aktualizujStatistiky();

zobrazPosledniExport();