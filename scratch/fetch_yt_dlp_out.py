import sys
import json
import yt_dlp

channels = {
    "MusicLabChill": "https://www.youtube.com/@MusicLabChill",
    "CosmicHippoSounds": "https://www.youtube.com/@CosmicHippoSounds",
    "GrindnGroove": "https://www.youtube.com/@GrindnGroove",
    "MMStudioX": "https://www.youtube.com/@MMStudioX",
    "WorkBeatsLab": "https://www.youtube.com/@WorkBeatsLab",
    "StillMindMusicOfficial": "https://www.youtube.com/@StillMindMusicOfficial"
}

ydl_opts = {
    'extract_flat': True,
    'quiet': True
}

with open("yt_results.txt", "w") as f:
    for name, url in channels.items():
        f.write(f"--- Channel: {name} ---\n")
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                videos = info.get('entries', [])
                valid_videos = [{'title': v.get('title',''), 'views': v.get('view_count') or 0} for v in videos]
                valid_videos.sort(key=lambda x: x['views'], reverse=True)
                
                f.write(f"Total videos: {len(valid_videos)}\n")
                
                above_1m = [v for v in valid_videos if v['views'] >= 1000000]
                between_100k_1m = [v for v in valid_videos if 100000 <= v['views'] < 1000000]
                
                f.write(f"Above 1M: {len(above_1m)}\n")
                for v in above_1m:
                    f.write(f"  - {v['title']} ({int(v['views'])} views)\n")
                    
                f.write(f"100K to 1M: {len(between_100k_1m)}\n")
                # print top 5 of 100k to 1m
                for v in between_100k_1m[:10]:
                    f.write(f"  - {v['title']} ({int(v['views'])} views)\n")
                if len(between_100k_1m) > 10:
                    f.write(f"  ... and {len(between_100k_1m)-10} more\n")
                    
                # print average of all videos
                avg = sum([v['views'] for v in valid_videos]) / len(valid_videos) if len(valid_videos) > 0 else 0
                f.write(f"Average of ALL videos: {int(avg)} views\n\n")
        except Exception as e:
            f.write(f"Error fetching {name}: {e}\n\n")
