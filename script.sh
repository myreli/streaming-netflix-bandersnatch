#!/bin/sh

# retrieve all mp4 media files inside assets/timeline folder and generate multiple video resolutions for those videos using its metadata. 

ASSETS_FOLDER=assets/timeline

for MEDIA_FILE in `ls $ASSETS_FOLDER | grep .mp4`; do
    # 1. retrieve filename 
    FILE_NAME=$(echo $MEDIA_FILE | sed -n 's/.mp4//p' | sed -n 's/-1920x1080//p')

    # 2. split files into isolated folders and create different files for each video resolution
    FILE_PATH=$ASSETS_FOLDER/$MEDIA_FILE
    FOLDER_TARGET=$ASSETS_FOLDER/$FILE_NAME

    mkdir -p $FOLDER_TARGET

    OUTPUT=$ASSETS_FOLDER/$FILE_NAME/$FILE_NAME
    DURATION=$(ffprobe -i $FILE_PATH -show_format -v quiet | sed -n 's/duration=//p')
    
    OUTPUT144=$OUTPUT-$DURATION-144
    OUTPUT360=$OUTPUT-$DURATION-360
    OUTPUT720=$OUTPUT-$DURATION-720

    echo 'rendering in 720p'
    ffmpeg -y -i $FILE_PATH \
        -c:a aac -ac 2 \
        -vcodec h264 -acodec aac \
        -ab 128k \
        -movflags frag_keyframe+empty_moov+default_base_moof \
        -b:v 1500k \
        -maxrate 1500k \
        -bufsize 1000k \
        -vf "scale=-1:720" \
        -v quiet \
        $OUTPUT720.mp4

    echo 'rendering in 360p'
    ffmpeg -y -i $FILE_PATH \
        -c:a aac -ac 2 \
        -vcodec h264 -acodec aac \
        -ab 128k \
        -movflags frag_keyframe+empty_moov+default_base_moof \
        -b:v 400k \
        -maxrate 400k \
        -bufsize 400k \
        -vf "scale=-1:360" \
        -v quiet \
        $OUTPUT360.mp4

    echo 'rendering in 144'
    ffmpeg -y -i $FILE_PATH \
        -c:a aac -ac 2 \
        -vcodec h264 -acodec aac \
        -ab 128k \
        -movflags frag_keyframe+empty_moov+default_base_moof \
        -b:v 300k \
        -maxrate 300k \
        -bufsize 300k \
        -vf "scale=256:144" \
        -v quiet \
        $OUTPUT144.mp4

    echo $OUTPUT144.mp4
    echo $OUTPUT360.mp4
    echo $OUTPUT720.mp4

done