package com.monotics.app.capstone_app

import android.content.Intent
import android.graphics.Insets.add
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import com.google.firebase.messaging.Constants.MessageNotificationKeys.TAG
import com.google.firebase.storage.FirebaseStorage
import com.monotics.app.capstone_app.databinding.ActivityMissenrollBinding
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList

class MissEnrollActivity: AppCompatActivity() {
    val db:FirebaseFirestore = Firebase.firestore
    private val MissingCollectionRef = db.collection("Missing")
    var list=ArrayList<Uri>()
    val adapter = MultiImageAdapter(list, this)
    val binding by lazy { ActivityMissenrollBinding.inflate(layoutInflater) }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        var recyclerview = findViewById<RecyclerView>(R.id.recyclerView)

        //프로필화면 돌아가기
        binding.profile.setOnClickListener{
            val intent = Intent(this,ProfileActivity::class.java)
            startActivity(intent)
        }

        //뒤로가기 버튼
        binding.backbtn.setOnClickListener{
            super.onBackPressed();
        }

        //사진업로드 버튼
        binding.findimg.setOnClickListener {
//            //권한 있는 지 확인 먼저
//            val readPermission = ActivityCompat.checkSelfPermission(
//                this,
//                android.Manifest.permission.READ_EXTERNAL_STORAGE
//            )
            binding.findimg.visibility= View.INVISIBLE
            val intent = Intent(Intent.ACTION_PICK)
            intent.data = MediaStore.Images.Media.EXTERNAL_CONTENT_URI
            intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE,true)
            intent.action=Intent.ACTION_GET_CONTENT

            startActivityForResult(intent, 10)
        }
        val layoutManager = LinearLayoutManager(this)
        recyclerview.layoutManager= layoutManager
        recyclerview.adapter=adapter

        //등록하기 버튼
        binding.enroll.setOnClickListener {
            
            if(binding.farcolorEdit.text.isBlank()||binding.nameEdit.text.isBlank()){
                Toast.makeText(this,"필수항목을 채워야 합니다", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            
            val address = binding.addressEdit.text.toString()
            val farcolor = binding.farcolorEdit.text.toString()
            val feature = binding.personalityEdit.text.toString()
            val gender = binding.genderEdit.text.toString()
            val specify = binding.specifyEdit.text.toString()
            val name = binding.nameEdit.text.toString()
            val enrollinf= hashMapOf(
                "address" to address,
                "farColor" to farcolor,
                "feature" to feature,
                "gender" to gender,
                "specify" to specify,
                "name" to name
            )
            MissingCollectionRef.document().set(enrollinf).addOnFailureListener{
                Toast.makeText(this,"실종 등록에 실패하였습니다.", Toast.LENGTH_SHORT).show()
            }
            super.onBackPressed()

        }

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if(resultCode== RESULT_OK && requestCode == 10){
            list.clear()
            if(data?.clipData != null){ //다중 선택
                val count = data.clipData!!.itemCount

                if(count>5){
                    Toast.makeText(applicationContext,"사진은 5장까지만 선택 가능합니다", Toast.LENGTH_SHORT)
                    return
                }
                for(i in 0 until count){
                    val imageUri = data.clipData!!.getItemAt(i).uri
                    //uploadImageFirebase(imageUri)
                    list.add(imageUri)
                }
            }else{// 단일 선택
                data?.data?.let{ uri ->
                    val imageUri : Uri? = data?.data
                    if(imageUri != null){
                        list.add(imageUri)
                        //uploadImageFirebase(imageUri)
                    }
                }
            }
            adapter.notifyDataSetChanged()
        }
    }
    fun uploadImageFirebase(uri: Uri){
        var storage: FirebaseStorage? = FirebaseStorage.getInstance()   //FirebaseStorage 인스턴스 생성
        //파일 이름 생성.
        var fileName = "IMAGE_${SimpleDateFormat("yyyymmdd_HHmmss").format(Date())}_.png"
        //파일 업로드, 다운로드, 삭제, 메타데이터 가져오기 또는 업데이트를 하기 위해 참조를 생성.
        //참조는 클라우드 파일을 가리키는 포인터라고 할 수 있음.
        var imagesRef = storage!!.reference.child(fileName)    //기본 참조 위치/images/${fileName}
        //이미지 파일 업로드
        imagesRef.putFile(uri!!).addOnSuccessListener {

        }.addOnFailureListener {
            println(it)
            Toast.makeText(this, "올리기 실패", Toast.LENGTH_SHORT).show()
        }
    }
}