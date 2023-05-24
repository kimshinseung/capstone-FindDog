package com.monotics.app.capstone_app

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.monotics.app.capstone_app.databinding.ActivityDetailFindBinding
import kotlinx.android.synthetic.main.activity_detail_find.detail_find_recycler


class DetailfindActivity: AppCompatActivity()  {
    val binding by lazy { ActivityDetailFindBinding.inflate(layoutInflater) }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        val inf = intent.getSerializableExtra("findData") as HashMap<String,Any>
        binding.detailFindAddress.text=inf["address"] as? String
        binding.detailFindAge.text=inf["age"] as? String
        binding.detailFindTime.text=inf["date"] as? String
        binding.detailFindFarColor1.text=inf["farColor1"] as? String
        binding.detailFindFarColor2.text=inf["farColor2"] as? String
        binding.detailFindFeature.text=inf["feature"] as? String
        binding.detailFindKakaid.text=inf["kakaoId"] as? String
        binding.detailFindGender.text=inf["gender"] as? String
        binding.detailFindSpecify.text=inf["specify"] as? String
        val imageUrls = inf["imgs"] as ArrayList<String>?

        var manager02 = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        var adapter02 = if (imageUrls != null) DetailImageAdapter(imageUrls) else DetailImageAdapter(ArrayList<String>())

        var RecyclerView02 = detail_find_recycler.apply {
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
    }
}