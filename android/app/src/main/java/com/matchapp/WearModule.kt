package com.matchapp

import android.util.Log
import com.facebook.react.bridge.*
import com.google.android.gms.wearable.Wearable
import com.google.android.gms.wearable.MessageClient
import com.google.android.gms.wearable.MessageEvent
import com.facebook.react.modules.core.DeviceEventManagerModule

class WearModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), MessageClient.OnMessageReceivedListener {

    init {
        try {
            Log.d("WearModule", "Initializing WearModule")
            Wearable.getMessageClient(reactContext).addListener(this)
            Log.d("WearModule", "WearModule initialized successfully")
        } catch (e: Exception) {
            Log.e("WearModule", "Error initializing WearModule", e)
        }
    }

    override fun getName(): String = "WearModule"

    @ReactMethod
    fun sendMessageToWatch(message: String, promise: Promise) {
        Thread {
            try {
                val nodeTask = Wearable.getNodeClient(reactApplicationContext).connectedNodes
                nodeTask.addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        val nodes = task.result
                        if (nodes.isNullOrEmpty()) {
                            promise.reject("NO_NODES", "No connected nodes found.")
                            return@addOnCompleteListener
                        }
                        for (node in nodes) {
                            val sendTask = Wearable.getMessageClient(reactApplicationContext)
                                .sendMessage(node.id, "/counter", message.toByteArray())
                            sendTask.addOnCompleteListener { sendResult ->
                                if (sendResult.isSuccessful) {
                                  Log.d("WearModule", "Message sent successfully to node: ${node.id}")
                                    promise.resolve("Sent: $message, to node: $node")
                                } else {
                                    promise.reject("SEND_FAILED", sendResult.exception)
                                }
                            }
                        }
                    } else {
                        promise.reject("NODE_FETCH_FAILED", task.exception)
                    }
                }
            } catch (e: Exception) {
                promise.reject("SEND_FAILED", e)
            }
        }.start()
    }

    override fun onMessageReceived(messageEvent: MessageEvent) {
        Log.d("WearModule", "Message received: ${messageEvent.path}")
        if (messageEvent.path == "/counter") {
            val received = String(messageEvent.data)
            Log.d("WearModule", "Received from watch: $received")

            // Forward to JS
            val params = Arguments.createMap().apply {
                putString("value", received)
            }
            try {
                reactApplicationContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("WearCounterUpdate", params)
            } catch (e: Exception) {
                Log.e("WearModule", "Error emitting event to JS", e)
            }
        }
    }

    override fun onCatalystInstanceDestroy() {
        try {
            Wearable.getMessageClient(reactApplicationContext).removeListener(this)
        } catch (e: Exception) {
            Log.e("WearModule", "Error removing listener", e)
        }
    }
}
