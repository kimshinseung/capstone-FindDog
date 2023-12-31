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
                .override(500,500)
                .into(holder.image1)
            //uploadImageFirebase(items[position])
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
        fun bind(listener: View.OnClickListener, item:String){
            view.setOnClickListener(listener)
        }
    }
}