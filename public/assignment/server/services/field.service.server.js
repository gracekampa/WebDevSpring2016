/**
 * Created by OWNER on 4/1/2016.
 */
module.exports = function (app, formModel, fieldModel) {

    app.get("/api/assignment/form/:formId/field", fieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", addFieldToForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function fieldsForFormId(req, res) {
        var formId = req.params.formId;

        fieldModel.findFieldsByFormId(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.findField(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.deleteField(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addFieldToForm(req, res) {
        var field = req.body;
        var formId = req.params.formId;

        fieldModel.createField(formId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldById(req, res) {
        var field = req.body;
        //var fieldId = req.params.fieldId;
        var formId = req.params.formId;

        fieldModel.updateField(formId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

        var fieldId = req.params.fieldId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if (startIndex && endIndex) {
            fieldModel
                .sortField(formId, fieldId, startIndex, endIndex)
                .then(
                    function (stat) {
                        return res.json(200);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }
}