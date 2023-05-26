const tableBody = document.getElementById("data-body");

function loadData() {
    fetch("https://raw.freesubdomains.org", {
        method: "GET"
    }).then(res => res.json()).then(data => {
        data.sort((a, b) => `${a.subdomain}.${a.domain}`.localeCompare(`${b.subdomain}.${b.domain}`));

        data.forEach(i => {
            let row = tableBody.insertRow(-1);

            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);
            let c3 = row.insertCell(2);
            let c4 = row.insertCell(3);

            c1.classList = "px-4 py-2 outline outline-1 outline-gray-700";
            c2.classList = "px-4 py-2 outline outline-1 outline-gray-700";
            c3.classList = "px-4 py-2 outline outline-1 outline-gray-700";
            c4.classList = "px-4 py-2 outline outline-1 outline-gray-700 text-center";

            const icon = {
                false: "fa-solid fa-x text-red-600",
                true: "fa-solid fa-check text-green-600"
            }

            const records = [];

            Object.keys(i.records).forEach(record => {
                if(record === "A" || record === "AAAA") {
                    i.records[record].forEach(r => {
                        records.push(`<span class="text-blue-600 font-semibold">${record}</span> ${r}`);
                    })

                    return;
                }

                if(record === "TXT") {
                    i.records["TXT"].forEach(r => {
                        records.push(`<span class="text-blue-600 font-semibold">${record}</span> <span class="text-green-600 font-semibold">${r.name}</span> ${r.value}`);
                    })

                    return;
                }

                records.push(`<span class="text-blue-600 font-semibold">${record}</span> ${i.records[record]}`);
            })

            c1.innerHTML = `<a href="https://${i.subdomain}.${i.domain}" class="text-blue-600 hover:text-blue-700 font-semibold">${i.subdomain}.${i.domain}</a>`;
            c2.innerHTML = `<a href="mailto:${i.owner.email.replace(" (at) ", "@")}" class="underline underline-2 hover:no-underline">${i.owner.email.replace(" (at) ", "@")}</a>`;
            c3.innerHTML = `${records.join("<br>")}`;
            c4.innerHTML = `<i class="${icon[i.proxied]}"></i>`;
        })
    })
}

loadData();
