package com.monotics.app.capstone_app

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2

class ViewPagerAdapter(
    var imageMembers: ArrayList<Int>
): RecyclerView.Adapter<ViewPagerAdapter.ViewPagerViewHolder>() {
    inner class ViewPagerViewHolder(parent: ViewGroup): RecyclerView.ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.pager, parent, false)) {
        val imageMember = itemView.findViewById<ImageView>(R.id.slide_imageView)
    }

    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ) = ViewPagerViewHolder((parent))


    override fun onBindViewHolder(holder: ViewPagerViewHolder, position: Int) {
        holder.imageMember.setImageResource(imageMembers[position])
    }

    override fun getItemCount(): Int = imageMembers.size



}