package com.monotics.app.capstone_app.data

data class MissModel(
    val address: String,
    val farColor: String,
    val feature: String,
    val gender: String,
    val name: String,
    val specify: String,
    val img: String,
){
    constructor(): this("","","","","","","")
}