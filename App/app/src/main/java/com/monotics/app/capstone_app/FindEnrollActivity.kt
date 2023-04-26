package com.monotics.app.capstone_app

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.StorageReference
import com.google.firebase.storage.ktx.storage
import com.monotics.app.capstone_app.databinding.ActivityFindenrollBinding
import kotlinx.android.synthetic.main.activity_missenroll.*

class FindEnrollActivity :AppCompatActivity(){
    val binding by lazy { ActivityFindenrollBinding.inflate(layoutInflater) }
    private val imageUrls = ArrayList<String>()
    var list = ArrayList<Uri>()
    val adapter = MultiImageAdapter(list,this)

    private val PICK_IMAGE_REQUEST = 1

    private lateinit var storageRef: StorageReference
    private lateinit var db: FirebaseFirestore

    private lateinit var selectedImageUris: MutableList<Uri>
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

//        storageRef = Firebase.storage.reference
//        db = Firebase.firestore
//
//        selectedImageUris = mutableListOf()
//
//        val layoutManager = LinearLayoutManager(this)
//        recyclerView.layoutManager = layoutManager
//        recyclerView.adapter=adapter
//
//
//        //프로필화면 돌아가기
//        binding.profile.setOnClickListener{
//            val intent = Intent(this,ProfileActivity::class.java)
//            startActivity(intent)
//        }
//
//        //뒤로가기 버튼
//        binding.backbtn.setOnClickListener{
//            super.onBackPressed();
//        }
//
//        //사진업로드 버튼
//        binding.findimg.setOnClickListener {
//
//            //binding.findimg.visibility= View.INVISIBLE
//            val intent = Intent(Intent.ACTION_GET_CONTENT)
//            intent.type = "image/*"
//            intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
//            startActivityForResult(intent, PICK_IMAGE_REQUEST)
//        }
//
//        //등록하기 버튼
//        binding.enroll.setOnClickListener {
//
//            if(binding.farcolorEdit.text.isBlank()||binding.nameEdit.text.isBlank()){
//                Toast.makeText(this,"필수항목을 채워야 합니다", Toast.LENGTH_SHORT).show()
//                return@setOnClickListener
//            }
//
//            val address = binding.addressEdit.text.toString()
//            val farcolor = binding.farcolorEdit.text.toString()
//            val feature = binding.personalityEdit.text.toString()
//            val gender = binding.genderEdit.text.toString()
//            val specify = binding.specifyEdit.text.toString()
//            val name = binding.nameEdit.text.toString()
//
//            val enrollinf= hashMapOf(
//                "address" to address,
//                "farColor" to farcolor,
//                "feature" to feature,
//                "gender" to gender,
//                "specify" to specify,
//                "name" to name,
//                "img" to ArrayList<String>(imageUrls)
//            )
//            db.collection("Missing")
//                .add(enrollinf)
//                .addOnSuccessListener { documentReference->
//                    Toast.makeText(this,"게시물을 등록했습니다", Toast.LENGTH_SHORT).show()
//
//
//                }
//
//            super.onBackPressed()
//
//        }

    }


}