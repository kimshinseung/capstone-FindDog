package com.monotics.app.capstone_app

import android.content.Context
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.firebase.storage.FirebaseStorage
import java.text.SimpleDateFormat
import java.util.*
import kotlin.collections.ArrayList

class MultiImageAdapter(private val items: ArrayList<Uri>,val context: Context):
    RecyclerView.Adapter<MultiImageAdapter.ViewHolder>() {

    override fun getItemCount(): Int = items.size

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = items[position]

        if(items[0]!=null){
            Glide.with(context).load(item)
                .override(800,500)
                .into(holder.image1)
            uploadImageFirebase(items[position])
            //uploadImageFirebase(items[1])
        }
    }


    override fun onCreateViewHolder(parent: ViewGroup,viewType: Int):ViewHolder{
        val inflatedView = LayoutInflater.from(parent.context).inflate(R.layout.multi_image_item,parent,false)
        return ViewHolder(inflatedView)
    }

    class ViewHolder(v: View) : RecyclerView.ViewHolder(v){
        private var view: View =v
        var image1 = v.findViewById<ImageView>(R.id.image1)
        var image2 = v.findViewById<ImageView>(R.id.image2)
        var image3 = v.findViewById<ImageView>(R.id.image3)

        fun bind(listener: View.OnClickListener, item:String){
            view.setOnClickListener(listener)
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
        }
    }
}