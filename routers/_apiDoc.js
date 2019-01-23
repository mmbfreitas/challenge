/**
 * @apiDefine errNotAuthorized
 *
 * @apiError AUT-00002 Não autorizado.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Ok
 *     {
 *        "error": {
 *          "code": "AUT0002",
 *          "desc": "Não autorizado."
 *        }
 *      }
 */


/**
 * @apiDefine errGeneral
 *
 * @apiError GLO-00001 Ocorreu um erro.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Ok
 *     {
 *        "error": {
 *          "code": "GLO0001",
 *          "desc": "Ocorreu um erro."
 *        }
 *      }
 */

/**
 * @apiDefine PdvObj
 *
 * @apiSuccess {Object}   pdv                                    Pdv.
 * @apiSuccess {String}   pdv._id                                Id of mongo.
 * @apiSuccess {Number}   pdv.id                                 Sequencial Id to search.
 * @apiSuccess {String}   pdv.tradingName                        Trading name of Pdv.
 * @apiSuccess {String}   pdv.ownerName                          Pdv owner name.
 * @apiSuccess {String}   match.document                         Pdv CNPJ.
 * @apiSuccess {Object}   match.coverageArea                     Area where pdv makes the delivery.
 * @apiSuccess {String}   match.coverageArea.type                Geo type
 * @apiSuccess {Array}    match.coverageArea.coordinates         Array of points that define the boundary of area(long, lat) - to MultiPolygon, must have 4 depth [[[[23,45], [24,56]]]]
 * @apiSuccess {String}   match.address                          Pdv location
 * @apiSuccess {String}   match.address.type                     Geo type (always Point)
 * @apiSuccess {Array}    match.address.coordinates               Pdv location point (long, lat)
 *
 */