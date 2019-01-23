'use strict';
const ModelFactory = require('../model/factory');
const PdvModel = new ModelFactory('pdv');

module.exports = (app) => {

    /**
     * @api {get} pdv
     * @apiVersion 1.0.0
     * @apiName Get Pdv by coordinates
     * @apiGroup Pdv - Get
     * @apiDescription Endpoint to return a Pdv by coordinates
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3007/v1/pdv?lat=123&lng=123
     *
     * @apiParam {Number}    lat           Latitude.
     * @apiParam {Number}    lng           Longitude.
     *
     * @apiUse PdvObj
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 Ok
     *     [{
     *      "result": {
     *          "_id": "5c479ef3392831012640365a",
     *          "id": "4",
     *          "tradingName": "Bar do Ze",
     *          "ownerName": "Joao Silva",
     *          "document": "04698149428",
     *          "coverageArea": {
     *              "type": "MultiPolygon",
     *              "coordinates": [
     *                  [
     *                      [
     *                          [
     *                              -38.56586,
     *                              -3.85041
     *                          ],
     *                          [
     *                              -38.49599,
     *                              -3.87361
     *                          ],
     *                          [
     *                              -38.45033,
     *                              -3.90358
     *                          ],
     *                          [
     *                              -38.42304,
     *                              -3.90273
     *                          ],
     *                          [
     *                              -38.37892,
     *                              -3.88971
     *                          ],
     *                          [
     *                              -38.35566,
     *                              -3.8844
     *                          ],
     *                          [
     *                              -38.39557,
     *                              -3.82497
     *                          ],
     *                          [
     *                              -38.41531,
     *                              -3.80133
     *                          ],
     *                          [
     *                              -38.42771,
     *                              -3.76754
     *                          ],
     *                          [
     *                              -38.44251,
     *                              -3.75054
     *                          ],
     *                          [
     *                              -38.45672,
     *                              -3.75024
     *                          ],
     *                          [
     *                              -38.46562,
     *                              -3.74746
     *                          ],
     *                          [
     *                              -38.46525,
     *                              -3.74657
     *                          ],
     *                          [
     *                              -38.46616,
     *                              -3.74458
     *                          ],
     *                          [
     *                              -38.46507,
     *                              -3.74083
     *                          ],
     *                          [
     *                              -38.47256,
     *                              -3.73743
     *                          ],
     *                          [
     *                              -38.47844,
     *                              -3.72759
     *                          ],
     *                          [
     *                              -38.49002,
     *                              -3.72476
     *                          ],
     *                          [
     *                              -38.49573,
     *                              -3.72254
     *                          ],
     *                          [
     *                              -38.51226,
     *                              -3.71384
     *                          ],
     *                          [
     *                              -38.51736,
     *                              -3.74292
     *                          ],
     *                          [
     *                              -38.52517,
     *                              -3.7681
     *                          ],
     *                          [
     *                              -38.53095,
     *                              -3.78294
     *                          ],
     *                          [
     *                              -38.53415,
     *                              -3.79124
     *                          ],
     *                          [
     *                              -38.5412,
     *                              -3.79573
     *                          ],
     *                          [
     *                              -38.55148,
     *                              -3.80326
     *                          ],
     *                          [
     *                              -38.55796,
     *                              -3.82
     *                          ],
     *                          [
     *                              -38.5656,
     *                              -3.84839
     *                          ],
     *                          [
     *                              -38.56586,
     *                              -3.85041
     *                          ]
     *                      ]
     *                  ]
     *              ]
     *          },
     *          "address": {
     *              "type": "Point",
     *              "coordinates": [
     *                  -38.495586,
     *                  -3.809936
     *              ]
     *          }
     *      }
     *  }]
     *
     * @apiError PDV-00002 Latitude não informada.
     * @apiError PDV-00003 Longitude não informada.
     * @apiError PDV-00004 Valor inválido para latitude.
     * @apiError PDV-00005 Valor inválido para longitude.
     * @apiError PDV-00006 Nenhum pdv encontrado.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Ok
     *     {
     *        "error": {
     *          "code": "PDV-00002",
     *          "desc": "Informe a latitude."
     *        }
     *      }
     */
    app.get('/', (req, res, next) => PdvModel.getByCoordinates(req,res,next));

    /**
     * @api {get} pdv/:id
     * @apiVersion 1.0.0
     * @apiName Get Pdv by Id
     * @apiGroup Pdv - Get
     * @apiDescription Endpoint to return a Pdv by id
     *
     * @apiExample Example usage:
     * curl -i http://localhost:3007/v1/pdv/1
     *
     * @apiParam {Number}    id           identifier.
     *
     * @apiUse PdvObj
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 Ok
     *     [{
     *      "result": {
     *          "_id": "5c479ef3392831012640365a",
     *          "id": "4",
     *          "tradingName": "Bar do Ze",
     *          "ownerName": "Joao Silva",
     *          "document": "04698149428",
     *          "coverageArea": {
     *              "type": "MultiPolygon",
     *              "coordinates": [
     *                  [
     *                      [
     *                          [
     *                              -38.56586,
     *                              -3.85041
     *                          ],
     *                          [
     *                              -38.49599,
     *                              -3.87361
     *                          ],
     *                          [
     *                              -38.45033,
     *                              -3.90358
     *                          ],
     *                          [
     *                              -38.42304,
     *                              -3.90273
     *                          ],
     *                          [
     *                              -38.37892,
     *                              -3.88971
     *                          ],
     *                          [
     *                              -38.35566,
     *                              -3.8844
     *                          ],
     *                          [
     *                              -38.39557,
     *                              -3.82497
     *                          ],
     *                          [
     *                              -38.41531,
     *                              -3.80133
     *                          ],
     *                          [
     *                              -38.42771,
     *                              -3.76754
     *                          ],
     *                          [
     *                              -38.44251,
     *                              -3.75054
     *                          ],
     *                          [
     *                              -38.45672,
     *                              -3.75024
     *                          ],
     *                          [
     *                              -38.46562,
     *                              -3.74746
     *                          ],
     *                          [
     *                              -38.46525,
     *                              -3.74657
     *                          ],
     *                          [
     *                              -38.46616,
     *                              -3.74458
     *                          ],
     *                          [
     *                              -38.46507,
     *                              -3.74083
     *                          ],
     *                          [
     *                              -38.47256,
     *                              -3.73743
     *                          ],
     *                          [
     *                              -38.47844,
     *                              -3.72759
     *                          ],
     *                          [
     *                              -38.49002,
     *                              -3.72476
     *                          ],
     *                          [
     *                              -38.49573,
     *                              -3.72254
     *                          ],
     *                          [
     *                              -38.51226,
     *                              -3.71384
     *                          ],
     *                          [
     *                              -38.51736,
     *                              -3.74292
     *                          ],
     *                          [
     *                              -38.52517,
     *                              -3.7681
     *                          ],
     *                          [
     *                              -38.53095,
     *                              -3.78294
     *                          ],
     *                          [
     *                              -38.53415,
     *                              -3.79124
     *                          ],
     *                          [
     *                              -38.5412,
     *                              -3.79573
     *                          ],
     *                          [
     *                              -38.55148,
     *                              -3.80326
     *                          ],
     *                          [
     *                              -38.55796,
     *                              -3.82
     *                          ],
     *                          [
     *                              -38.5656,
     *                              -3.84839
     *                          ],
     *                          [
     *                              -38.56586,
     *                              -3.85041
     *                          ]
     *                      ]
     *                  ]
     *              ]
     *          },
     *          "address": {
     *              "type": "Point",
     *              "coordinates": [
     *                  -38.495586,
     *                  -3.809936
     *              ]
     *          }
     *      }
     *  }]
     *
     * @apiError PDV-00001 Código não informado.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Ok
     *     {
     *        "error": {
     *          "code": "PDV-00001",
     *          "desc": "Informe o código do Pdv."
     *        }
     *      }
     */
    app.get('/:id', (req, res, next) => PdvModel.getById(req,res,next));

    app.post('/', (req, res, next) => PdvModel.insert(req,res,next));
};
