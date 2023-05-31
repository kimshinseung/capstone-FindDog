package com.monotics.app.capstone_app.data

import com.google.firebase.Timestamp

data class ForumData(var content:ArrayList<String>?=null,
                     var title : String?=null,
                     var uploadTime:Timestamp ?= null,
                     var user: String?=null)
