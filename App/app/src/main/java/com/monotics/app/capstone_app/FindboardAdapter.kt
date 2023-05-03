package com.monotics.app.capstone_app

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.missboard.view.textImg

class FindboardAdapter(var list: ArrayList<String>): RecyclerView.Adapter<FindboardAdapter.ListAdapter>() {

    class ListAdapter(val layout: View): RecyclerView.ViewHolder(layout)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ListAdapter {
        return ListAdapter(LayoutInflater.from(parent.context).inflate(R.layout.missboard, parent, false))
    }

    override fun onBindViewHolder(holder: ListAdapter, position: Int) {
        holder.layout.textImg.text = list[position]

    }

    override fun getItemCount(): Int {
        return list.size
    }
}