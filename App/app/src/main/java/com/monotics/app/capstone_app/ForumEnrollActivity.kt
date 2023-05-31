package com.monotics.app.capstone_app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ProgressBar
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.Timestamp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.google.firebase.messaging.Constants.MessageNotificationKeys.TAG
import com.google.firebase.storage.FirebaseStorage
import com.google.firebase.storage.StorageReference
import com.google.firebase.storage.ktx.storage
import com.monotics.app.capstone_app.databinding.ActivityForumenrollBinding
import com.monotics.app.capstone_app.databinding.ActivityMissenrollBinding
import kotlinx.android.synthetic.main.activity_missenroll.recyclerView
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList

class ForumEnrollActivity: AppCompatActivity() {
    val binding by lazy { ActivityForumenrollBinding.inflate(layoutInflater) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)


        //프로필화면 돌아가기
        binding.profile.setOnClickListener {
            val intent = Intent(this, ProfileActivity::class.java)
            startActivity(intent)
        }

        //뒤로가기 버튼
        binding.backbtn.setOnClickListener {
            super.onBackPressed();
        }

        binding.forumenrollBtn.setOnClickListener {

//            val title = binding.enrollTitle.text.toString()
//            val user = binding.enrollUser.text.toString()
//            val date = Timestamp.now()
//            val content = binding.enrollContent.text.toString()
//
//            val enrollinf = hashMapOf(
//                "title" to title,
//                "user" to user,
//                "uploadTime" to date,
//                "content" to ArrayList<String>(content)
//
//            )

        }

    }
}