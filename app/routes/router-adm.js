const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index-adm");
});

router.get("/adm-cliente", (req, res) => {
    res.render("pages/adm-cliente");
});

router.get("/adm-cliente-novo", (req, res) => {
    res.render("pages/adm-cliente-novo", {
        errors: [],
        dados: {}
    });
});

// Validação do cadastro de cliente
router.post(
    "/adm-cliente-novo",
    [
        body("cep")
            .trim()
            .notEmpty()
            .withMessage("O CEP é obrigatório.")
            .isLength({ min: 8, max: 9 })
            .withMessage("CEP inválido."),

        body("nomeUsuario")
            .trim()
            .notEmpty()
            .withMessage("O nome de usuário é obrigatório.")
            .isLength({ min: 3, max: 50 })
            .withMessage("O nome deve possuir entre 3 e 50 caracteres."),

        body("email")
            .trim()
            .notEmpty()
            .withMessage("O e-mail é obrigatório.")
            .isEmail()
            .withMessage("Informe um e-mail válido.")
            .normalizeEmail(),

        body("senha")
            .notEmpty()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 6 })
            .withMessage("A senha deve possuir no mínimo 6 caracteres."),

        body("tipo")
            .notEmpty()
            .withMessage("Selecione o tipo de usuário.")
            .isIn(["1", "2"])
            .withMessage("Tipo de usuário inválido."),

        body("status")
            .notEmpty()
            .withMessage("Selecione o status.")
            .isIn(["0", "1"])
            .withMessage("Status inválido.")
    ],

    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("pages/adm-cliente-novo", {
                errors: errors.array(),
                dados: req.body
            });
        }

        // Aqui será salvo no banco futuramente
        console.log(req.body);

        res.redirect("/adm/adm-cliente");
    }
);

router.get("/adm-cliente-edit", (req, res) => {
    res.render("pages/adm-cliente-edit");
});

router.get("/adm-cliente-list", (req, res) => {
    res.render("pages/adm-cliente-list");
});

router.get("/adm-cliente-del", (req, res) => {
    res.render("pages/adm-cliente-del");
});

module.exports = router;