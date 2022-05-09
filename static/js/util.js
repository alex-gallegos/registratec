function load_into(url, id) {
    const element = document.getElementById(id);
    fetch(url)
    .then(res => res.text())
    .then(html => element.innerHTML = html);
}