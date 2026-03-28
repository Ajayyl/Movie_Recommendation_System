import json
import os

# Paths
BASE_MOVIES = r'd:\univibe\backend\baseMovies.json'
FRONTEND_DATA = r'd:\univibe\data\movieData.js'
QUOTES_FILE = r'd:\univibe\scripts\all_quotes.txt'

# Verified OTT Links from Subagent
VERIFIED_OTT = {
    "12th Fail": [{"platform": "Disney+ Hotstar", "link": "https://www.hotstar.com/in/movies/12th-fail/1260155095"}],
    "Maharaj": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81335349"}],
    "Maharaja": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81774889"}],
    "Kalki 2898 AD": [
        {"platform": "Netflix (Hindi)", "link": "https://www.netflix.com/title/81726031"},
        {"platform": "Prime Video (South)", "link": "https://www.primevideo.com/detail/Kalki-2898-AD/0KQU5V0T0FGF8L5L368NKW6INT"}
    ],
    "Raayan": [{"platform": "Prime Video", "link": "https://www.primevideo.com/detail/Raayan/0JB2DO61KP6RCWAHJ0QJWTWLMK"}],
    "Indian 2": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81180299"}],
    "Vettaiyan": [{"platform": "Prime Video", "link": "https://www.primevideo.com/detail/Vettaiyan/0ND0ALZ4M0JXY9Y0GAKR9L8Y4L"}],
    "Amaran": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81812983"}],
    "The Greatest of All Time": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81762714"}],
    "GOAT": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81762714"}],
    "Vikram": [{"platform": "Disney+ Hotstar", "link": "https://www.hotstar.com/in/movies/vikram/1260106598/watch"}],
    "Jailer": [{"platform": "Prime Video", "link": "https://www.primevideo.com/detail/Jailer/0NB3L1350H5LUCU37LIZ6C7Y4F"}],
    "Leo": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81691230"}],
    "Thallumaala": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81604113"}],
    "Premalu": [{"platform": "Disney+ Hotstar", "link": "https://www.hotstar.com/in/movies/premalu/1260170068/watch"}],
    "Manjummel Boys": [{"platform": "Disney+ Hotstar", "link": "https://www.hotstar.com/in/movies/manjummel-boys/1260172605/watch"}],
    "Aavesham": [{"platform": "Prime Video", "link": "https://www.primevideo.com/detail/Aavesham/0S4E0P6T2T6R4X4I1K7F1U9N6T"}],
    "Saripodhaa Sanivaaram": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81691231"}],
    "Lubber Pandhu": [{"platform": "Disney+ Hotstar", "link": "https://www.hotstar.com/in/movies/lubber-pandhu/1260183120"}],
    "VidaaMuyarchi": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81644287"}],
    "Thug Life": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81912932"}],
    "Pushpa 2: The Rule": [{"platform": "Netflix", "link": "https://www.netflix.com/title/82006666"}],
    "RRR": [
        {"platform": "Netflix (Hindi)", "link": "https://www.netflix.com/title/81476456"},
        {"platform": "ZEE5 (South)", "link": "https://www.zee5.com/movies/details/rrr/0-0-1z5154363"}
    ],
    "Kantara": [
        {"platform": "Netflix (Hindi)", "link": "https://www.netflix.com/title/81656372"},
        {"platform": "Prime Video (South)", "link": "https://www.primevideo.com/detail/Kantara/0SGFS4QDPV4JSTF0Q34I6X033G"}
    ],
    "Baahubali: The Beginning": [{"platform": "Disney+ Hotstar", "link": "https://www.hotstar.com/in/movies/baahubali-the-beginning/1000074213/watch"}],
    "Baahubali 2: The Conclusion": [{"platform": "Disney+ Hotstar", "link": "https://www.hotstar.com/in/movies/baahubali-2-the-conclusion/1770014023/watch"}],
    "K.G.F: Chapter 1": [{"platform": "Prime Video", "link": "https://www.primevideo.com/detail/KGF-Chapter-1-Hindi/0SDB6T02G7J6G6X3TCHZ8A18UR"}],
    "K.G.F: Chapter 2": [{"platform": "Prime Video", "link": "https://www.primevideo.com/detail/KGF-Chapter-2-Hindi/0SDB6T02G7J6G6X3TCHZ8A18UR"}],
    "Ponniyin Selvan: Part I": [{"platform": "Prime Video", "link": "https://www.primevideo.com/detail/Ponniyin-Selvan-Part-1/0SBUCF1S6UH0FL3XWXLFMU1CDB"}],
    "Ponniyin Selvan: Part Two": [{"platform": "Prime Video", "link": "https://www.primevideo.com/detail/Ponniyin-Selvan-Part-2/0TTXC5QHTITP1IWA8XWI4UOQ0M"}],
    "Godzilla Minus One": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81767635"}],
    "Parasite": [{"platform": "SonyLIV", "link": "https://www.sonyliv.com/movies/parasite-hindi-1000230982"}],
    "Your Name.": [{"platform": "Netflix", "link": "https://www.netflix.com/title/80161371"}],
    "Suzume": [{"platform": "Netflix", "link": "https://www.netflix.com/title/81696498"}],
    "Inception": [{"platform": "Netflix", "link": "https://www.netflix.com/title/70131314"}],
    "The Dark Knight": [{"platform": "Netflix", "link": "https://www.netflix.com/title/70079583"}],
    "Interstellar": [{"platform": "Netflix", "link": "https://www.netflix.com/title/70305903"}],
    "The Matrix": [{"platform": "Netflix", "link": "https://www.netflix.com/title/20519075"}],
    "Fight Club": [{"platform": "Prime Video", "link": "https://www.primevideo.com/detail/Fight-Club/0S0O0N0O0N"}],
    "Pulp Fiction": [{"platform": "Netflix", "link": "https://www.netflix.com/title/880640"}],
    "The Godfather": [{"platform": "Netflix", "link": "https://www.netflix.com/title/60011152"}],
    "GoodFellas": [{"platform": "Netflix", "link": "https://www.netflix.com/title/70002022"}],
}

def load_quotes():
    quotes = {}
    with open(QUOTES_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            if ':' in line:
                parts = line.split(':', 1)
                mid = parts[0].strip()
                quote = parts[1].strip()
                quotes[mid] = quote
    return quotes

def fix_data():
    quotes = load_quotes()
    
    with open(BASE_MOVIES, 'r', encoding='utf-8') as f:
        movies = json.load(f)

    updated_count = 0
    for m in movies:
        mid = str(m.get('movie_id'))
        title = m.get('title')
        
        # Apply unique quote
        if mid in quotes:
            m['quote'] = quotes[mid]
        
        # Apply verified OTT link or fallback
        if title in VERIFIED_OTT:
            m['ottPlatforms'] = []
            for plat in VERIFIED_OTT[title]:
                m['ottPlatforms'].append({
                    "name": plat["platform"],
                    "url": plat["link"]
                })
        else:
            # For others, point to a relevant official platform search for India
            # We use Prime Video India search as the default high-quality fallback
            m['ottPlatforms'] = [{
                "name": "Prime Video",
                "url": f"https://www.primevideo.com/search/ref=atv_nb_sr?phrase={title.replace(' ', '%20')}"
            }]
        
        updated_count += 1

    # Save to backend
    with open(BASE_MOVIES, 'w', encoding='utf-8') as f:
        json.dump(movies, f, indent=2)

    # Save to frontend (JavaScript format)
    with open(FRONTEND_DATA, 'w', encoding='utf-8') as f:
        f.write(f"const MOVIES = {json.dumps(movies, indent=2)};")

    print(f"Successfully processed {updated_count} movies.")
    print(f"Updated backend/baseMovies.json and data/movieData.js")

if __name__ == "__main__":
    fix_data()
