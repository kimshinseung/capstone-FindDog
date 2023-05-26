package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.monotics.app.capstone_app.databinding.ActivityDetailFindBinding
import com.monotics.app.capstone_app.databinding.ActivityDetailMissBinding
import kotlinx.android.synthetic.main.activity_detail_miss.detail_recycler

class DetailActivity: AppCompatActivity()  {
    val binding by lazy { ActivityDetailMissBinding.inflate(layoutInflater) }
    private lateinit var db: FirebaseFirestore
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)
        binding.FindBtn.visibility = View.INVISIBLE

        db = Firebase.firestore

        val inf = intent.getSerializableExtra("missData") as HashMap<String,Any>
        binding.detailName.text=inf["name"] as? String
        binding.detailAddress.text=inf["address"] as? String
        binding.detailAge.text=inf["age"] as? String+"살"
        binding.detailDate.text=inf["date"] as? String
        binding.detailFarColor1.text=inf["farColor1"] as? String + ", "+inf["farColor2"] as? String
        //binding.detailFarColor2.text=inf["farColor2"] as? String
        binding.detailFeature.text=inf["feature"] as? String
        binding.detailKakaoId.text=inf["kakaoId"] as? String
        binding.detailGender.text=inf["gender"] as? String
        binding.detailNeutering.text=inf["neutering"] as? String
        binding.detailSpecify.text=inf["specify"] as? String

        val imageUrls = inf["imgs"] as ArrayList<String>?

        var manager02 = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        var adapter02 = if (imageUrls != null) DetailImageAdapter(imageUrls) else DetailImageAdapter(ArrayList<String>())

        var RecyclerView02 = detail_recycler.apply {
            adapter = adapter02
            layoutManager = manager02
        }

        //사진
//        Glide.with(binding.detailImg)
//            .load(imageUrls[0])
//            .into(binding.detailImg)

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
        //내 게시물일 경우 찾았어요 버튼 보이게하기
        if(FirebaseAuth.getInstance().uid == inf["uid"] as? String){
            binding.FindBtn.visibility = View.VISIBLE
            var id: String? = inf["id"] as? String
            binding.FindBtn.setOnClickListener {
                db.collection("Missing").document(id.toString()).update("visibled",false).addOnSuccessListener {
                    Log.d("kimshinseung","aa")
                    super.onBackPressed();
                }

            }
        }

    }
}