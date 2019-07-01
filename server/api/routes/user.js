const express = require("express")
const router = express.Router()
const utils = require("../../utils/mongoUtils")
const mongoose = require("../../utils/mongoConnection")

router.post("/", (req, res) => {
    utils.query_user(req.body.userName) 
        .then((findUser) => {
            if (!findUser)  {
                utils.create_user(req.body.userName)
                .then((createdUser) => {
                    return res.status(200).send({ 
                        "message" : "User created",
                        "content" : {
                            userName: createdUser.userName,
                            userId: createdUser._id
                        }
                    });
                })
            }
            else res.status(200).send({ 
                "message" : "The user already exists",
                "content" : findUser._id
            }) ; 
        })
})

router.get("/:userName", (req, res) => {
    utils.query_user(req.params.userName) 
        .then((findUser) => {
            if (!findUser)  return res.status(404).send({ 
                "message" : "The user does not exist",
                "content" : false
            });  

            else return res.status(200).send({
                "message" : "Got user",
                "content" : {
                    userName: findUser.userName,
                    userId: findUser._id
                }
            });
        })
})

router.post("/:userName/tvshow", (req, res) => {
    utils.query_user(req.params.userName)
    .then((findUser) => {
        if (!findUser)  return res.status(404).send({ 
            "message" : "The user does not exist",
            "content" : false
        });  
        utils.query_tvShow(findUser._id, req.body.tmdbID)
        .then((tvShowResponse) => {
            if (tvShowResponse)  return res.status(400).send({ 
                "message" : "The user has already added this tvshow",
                "content" : false
            }); 
            else{
                utils.add_tvShow(findUser._id, req.body.tmdbID, req.body.title, req.body.lastEpisode, req.body.lastSeason)
                .then((savedTvShow) =>{ 
                    return res.status(201).send({
                        "message" : "Added tvshow",
                        "content" : savedTvShow
                    });
                })   
                .catch((err) => {
                    return res.status(404).send({
                        "message" : "Error in saving the tvshow",
                        "content" : err
                    });
                })       
            }
        })
    })
})

router.get("/:userName/tvshow", (req, res) => {

    utils.query_user(req.params.userName)
    .then((findUser) => {
        if (!findUser)  return res.status(404).send({ 
            "message" : "The user does not exist",
            "content" : false
        });  
        else{
            if(req.query.tmdbID){
                utils.query_tvShow(findUser._id, req.query.tmdbID)
                .then((tvShowCollection) =>{ 
                    if (!tvShowCollection)  return res.status(404).send({ 
                        "message" : "The tvshow does not exist in the db",
                        "content" : false
                    });  
                    else return res.status(200).send({
                            "message" : "Got tvshow",
                            "content" : tvShowCollection
                        });
                })   
                .catch((err) => {
                    return res.status(404).send({
                        "message" : "Error",
                        "content" : err
                    });
                })

            }
            else{
                utils.query_allTvShows(findUser._id)
                .then((tvShowsCollection) =>{ 
                    return res.status(200).send({
                        "message" : "Got tvshows list",
                        "content" : tvShowsCollection
                    });
                })   
                .catch((err) => {
                    return res.status(404).send({
                        "message" : "Error",
                        "content" : err
                    });
                })

            }
        }
    })
})

// router.patch("/:userName/test", (req, res) => {
//     utils.query_user(req.params.userName)
//     .then((findUser) => {
//         if (!findUser)  return res.status(404).send({ 
//             "message" : "The user does not exist",
//             "content" : false
//         });  
//         if(req.query.testName){
//             utils.query_test(findUser._id, req.query.testName)
//             .then((tvShowResponse) => {
//                 if (!tvShowResponse)  return res.status(404).send({ 
//                     "message" : "The test does not exist",
//                     "content" : false
//                 }); 
//                 else{

//                     let op = req.body.op
//                     let path = req.body.path
//                     let value = null
//                     if (req.body.value) value = req.body.value

//                     if (op === "add"){
//                         utils.add_testValues(findUser._id, req.query.testName, path, value)
//                         .then((tvShowResponse) => {
//                             return res.status(200).send({ 
//                                 "message" : "Patched",
//                                 "content" : tvShowResponse
//                             }); 
//                         })
//                     }

//                     if (op == "replace"){

//                         utils.replace_testValues(findUser._id, req.query.testName, path, value)
//                         .then((tvShowResponse) => {

//                             if (tvShowResponse) return res.status(200).send({ 
//                                 "message" : "Patched",
//                                 "content" : tvShowResponse
//                             }); 

//                             else return res.status(400).send({ 
//                                 "message" : "Didn't find the property",
//                                 "content" : tvShowResponse
//                             }); 
//                         })                        

//                     }

//                     // if (op == "remove"){

//                     //     utils.remove_testValues(findUser._id, req.query.testName, path)
//                     //     .then((tvShowResponse) => {
//                     //         if (tvShowResponse) return res.status(200).send({ 
//                     //             "message" : "Patched",
//                     //             "content" : tvShowResponse
//                     //         }); 

//                     //         else return res.status(400).send({ 
//                     //             "message" : "Didn't find the property",
//                     //             "content" : tvShowResponse
//                     //         }); 
//                     //     })                        

//                     // }
//                 }
//             })
//         }
//     })
// })

module.exports = router


//test?testName=...&property=..

//test?testName=..

// {
// 	"userName" : "marco_bz",
// 	"testName" : "Analisi 1",
// 	"testSettings" : {
// 	    "numbersOfQuestions": 21,
// 	    "correctAnswersPoints": 1,
// 	    "wrongAnswersPoints": -0.5,
// 	    "noAnswersPoints": 0
// 	},
// 	"modules" : ["general"]
// }