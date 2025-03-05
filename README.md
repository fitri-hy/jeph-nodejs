# JephNode

JephNode is an experimental project that adapts the MVC (Model-View-Controller) structure and customizes the template engine syntax, designed to provide web-based application development.

```
ROOT/
├── app/
│   ├── controllers/
│   │   ├── api/
│   │   │	 └── ApiController.js
│   │   ├── Err404Controller.js
│   │   ├── HomeController.js
│   │   └── SpelledController.js
│   ├── views/
│   │   ├── layouts/
│   │   │	 └── main.dev
│   │   ├── partials/
│   │   │	 ├── header.dev
│   │   │	 └── footer.dev
│   │   └── home.dev
│   └── routes/
│       ├── api.js
│       └── web.js
├── public/
│   ├── css/
│   ├── images/
│   └── js/
├── core/
│   ├── Framework.js
│   ├── Router.js
│   ├── Controller.js
│   ├── View.js
│   └── State.js
├── index.js
├── package.json
└── README.md
```

| Fitur                   | Dukungan                                             | Contoh                              |
|-------------------------|------------------------------------------------------|-------------------------------------|
| **Layout**               | `{{layout "main"}}`                                | `layouts/main.dev`                 |
| **Partial Include**      | `{{include "header"}}`                             | `partials/header.dev`              |
| **Loop**                 | `{{foreach users as user}} ... {{endforeach}}`     | Support `{{else}}`                |
| **Conditional If-Else**  | `{{if key}} ... {{else}} ... {{endif}}`            | -                                   |
| **Variabel**             | `{{key}}`                                         | Replaced with value from data  |
