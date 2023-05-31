package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.databinding.ActivityForumBinding
import kotlinx.android.synthetic.main.activity_forum.forum_recycler
import kotlinx.android.synthetic.main.activity_miss.missrecycler

class ForumActivity: AppCompatActivity()  {
    val binding by lazy { ActivityForumBinding.inflate(layoutInflater) }

    private lateinit var db: FirebaseFirestore
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        db = Firebase.firestore

        //프로필화면 돌아가기
        binding.profile.setOnClickListener{
            val intent = Intent(this,ProfileActivity::class.java)
            startActivity(intent)
        }

        //뒤로가기 버튼
        binding.backbtn.setOnClickListener{
            super.onBackPressed();
        }

        //로고화면 누르면 메인액티비티로
        binding.logo.setOnClickListener {
            val intent = Intent(this,MainActivity::class.java)
            startActivity(intent)
        }

        //글 등록
        binding.forumEnroll.setOnClickListener {
            val intent = Intent(this,ForumEnrollActivity::class.java)
            startActivity(intent)
        }

        //자유게시판
        var manager01 = LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false)
        var adapter01 = ForumAdapter()

        var RecyclerView02 = forum_recycler.apply {
            adapter = adapter01
            layoutManager = manager01
        }

    }
}