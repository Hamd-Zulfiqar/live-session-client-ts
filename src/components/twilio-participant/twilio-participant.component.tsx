import React, { useState, useEffect, useRef, createRef } from "react";
import twilio from "twilio";
import {
  AudioTrack,
  AudioTrackPublication,
  Participant,
  RemoteAudioTrack,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteVideoTrack,
  Track,
  TrackPublication,
  VideoTrack,
  VideoTrackPublication,
} from "twilio-video";

type IParticipantProp = {
  participant: any;
};

const TwilioParticipant = ({ participant }: IParticipantProp) => {
  const [videoTracks, setVideoTracks] = useState<any[]>([]);
  const [audioTracks, setAudioTracks] = useState<any[]>([]);

  const videoRef = createRef<HTMLVideoElement>();
  const audioRef = createRef<HTMLAudioElement>();

  const trackpubsToTracks = (
    trackMap: Map<string, VideoTrackPublication | AudioTrackPublication>
  ) => {
    const x = Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

    return x;
  };

  useEffect(() => {
    const trackSubscribed = (track: RemoteVideoTrack | RemoteAudioTrack) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: VideoTrack | AudioTrack) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));

    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    console.log("h1");
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true} />
    </div>
  );
};
export default TwilioParticipant;
