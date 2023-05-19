package com.monotics.app.capstone_app

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.firebase.firestore.Query
import com.monotics.app.capstone_app.data.MissData
import kotlinx.android.synthetic.main.detail_img.view.detail_img

class DetailImageAdapter(private val imageUrls: ArrayList<String>): RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    class ListAdapter(val layout: View): RecyclerView.ViewHolder(layout)
    init {
            notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        var view = LayoutInflater.from(parent.context).inflate(R.layout.detail_img,parent,false)
        return ViewHolder(view)
    }
    inner class ViewHolder(view: View) : RecyclerView.ViewHolder(view){}

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val viewHolder = (holder as ViewHolder).itemView
        val imageUrl = imageUrls[position]
        Glide.with(viewHolder.detail_img)
            .load(imageUrl)
            .into(viewHolder.detail_img)
    }

    override fun getItemCount(): Int {
        return imageUrls.size
    }
}