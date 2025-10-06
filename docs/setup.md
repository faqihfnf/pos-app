# Setup Project

### Install Next Js

- Untuk install next js bisa menggunakan perintah berikut, jika ingin menginstall versi terbaru

```bash
npx create-next-app@latest
```

- Untuk project ini, next js yang digunakan adalah versi 15.3.5

```bash
npx create-next-app@15.3.5
```

### Install Shadcn UI

- Untuk install shadcn ui bisa menggunakan perintah berikut

```bash
npx shadcn@latest init
```

- Setelah menginstall shadcn, maka otomatis akan dibuatkan `lib\utils.ts` di root project.
- Didalam file `utils.ts` tersebut terdapat function `cn` untuk menggabungkan class value menjadi satu class value
- Selain itu, css variable yang ada di `src\app\global.css` juga akan diupdate

### Install Prettier Plugin

- prettier plugin tailwindcss berguna untuk melakukan sortir dan pengurutan class secara otomatis setiap kali file di save

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

- Kemudian buat file `.prettierrc` di root project, kemudian add plugin di file tersebut

```bash
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```
