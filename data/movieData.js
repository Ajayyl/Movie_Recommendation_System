const MOVIES = [
    {
        "movie_id": 1,
        "title": "Inception",
        "genre": [
            "Sci-Fi",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 87,
        "popularity_score": 0.9,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com/title/70131314",
        "prime_url": "https://www.amazon.com/dp/B0047WJ11G",
        "year": 2010,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/lCwO4czSKzL1LP4h85T4b8C0UWD.jpg",
        "synopsis": "A skilled thief who infiltrates dreams is offered a chance to have his criminal record erased if he can successfully plant an idea in a target's subconscious.",
        "quote": "An idea is like a virus. Resilient. Highly contagious. — Sometimes the smallest thought planted in your mind changes your entire life.",
        "trailer": "YoHD9XEInc0",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/70131314"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B0047WJ11G"
            }
        ],
        "director": "Christopher Nolan",
        "cast": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        "keywords": "dream, subconscious, thief, heist, mind-bending",
        "cinematographer": "Wally Pfister",
        "music": "Hans Zimmer",
        "writer": "Christopher Nolan",
        "overview": "A skilled thief who infiltrates dreams is offered a chance to have his criminal record erased if he can successfully plant an idea in a target's subconscious."
    },
    {
        "movie_id": 2,
        "title": "The Grand Budapest Hotel",
        "genre": [
            "Comedy",
            "Drama"
        ],
        "experience_type": "fun",
        "rating_percent": 84,
        "popularity_score": 0.7,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B00J2PGLO0",
        "year": 2014,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
        "synopsis": "A legendary concierge at a famous European hotel and his trusted lobby boy become embroiled in the theft of a priceless painting.",
        "quote": "There are still faint glimmers of civilization left in this barbaric slaughterhouse. — Even in chaos, hold on to what makes life beautiful.",
        "trailer": "1Fg5iWmQjwk",
        "tags": [
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B00J2PGLO0"
            }
        ],
        "director": "Wes Anderson",
        "cast": "Ralph Fiennes, Tony Revolori, Adrien Brody",
        "keywords": "hotel, concierge, mystery, quirky, colorful",
        "cinematographer": "Robert Yeoman",
        "music": "Alexandre Desplat",
        "writer": "Wes Anderson",
        "overview": "A legendary concierge at a famous European hotel and his trusted lobby boy become embroiled in the theft of a priceless painting."
    },
    {
        "movie_id": 3,
        "title": "Finding Nemo",
        "genre": [
            "Animation",
            "Adventure"
        ],
        "experience_type": "fun",
        "rating_percent": 86,
        "popularity_score": 0.8,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 2003,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/xVNSgrsvpcAHPnyKf2phYxyppNZ.jpg",
        "synopsis": "A clownfish named Marlin embarks on a perilous journey across the ocean to find his abducted son Nemo, with the help of a forgetful fish named Dory.",
        "quote": "Just keep swimming. — When life gets hard, the only way out is forward.",
        "trailer": "SPHfeNgogVs",
        "tags": [
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com/movies/finding-nemo/5Gpj2XqF7BV2"
            }
        ],
        "director": "Andrew Stanton, Lee Unkrich",
        "cast": "Albert Brooks, Ellen DeGeneres, Alexander Gould",
        "keywords": "ocean, clownfish, father-son, journey, underwater",
        "cinematographer": "Sharon Calahan, Jeremy Lasky",
        "music": "Thomas Newman",
        "writer": "Andrew Stanton, Bob Peterson",
        "overview": "A clownfish named Marlin embarks on a perilous journey across the ocean to find his abducted son Nemo, with the help of a forgetful fish named Dory."
    },
    {
        "movie_id": 4,
        "title": "Blade Runner 2049",
        "genre": [
            "Sci-Fi",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 81,
        "popularity_score": 0.7,
        "age_limit": 16,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B0764GY2JD",
        "year": 2017,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
        "synopsis": "A young blade runner uncovers a long-buried secret that has the potential to plunge what's left of society into chaos.",
        "quote": "All those moments will be lost in time, like tears in rain. — Cherish every moment — they won't last forever.",
        "trailer": "gCcx85zbxz4",
        "tags": [
            "cult",
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B0764GY2JD"
            },
            {
                "name": "Apple TV",
                "url": "https://tv.apple.com"
            }
        ],
        "director": "Denis Villeneuve",
        "cast": "Ryan Gosling, Harrison Ford, Ana de Armas",
        "keywords": "replicant, sci-fi, cyberpunk, mystery, visuals",
        "cinematographer": "Roger Deakins",
        "music": "Hans Zimmer, Benjamin Wallfisch",
        "writer": "Hampton Fancher, Michael Green",
        "overview": "A young blade runner uncovers a long-buried secret that has the potential to plunge what's left of society into chaos."
    },
    {
        "movie_id": 5,
        "title": "The Shawshank Redemption",
        "genre": [
            "Drama"
        ],
        "experience_type": "emotional",
        "rating_percent": 91,
        "popularity_score": 1,
        "age_limit": 16,
        "netflix_url": "https://www.netflix.com",
        "prime_url": "",
        "year": 1994,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
        "synopsis": "A banker sentenced to life in Shawshank State Penitentiary forms an unlikely friendship and finds hope through acts of common decency.",
        "quote": "Get busy living, or get busy dying. — Hope is the one thing no prison can take from you.",
        "trailer": "PLl99DlL6b4",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com"
            },
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            }
        ],
        "director": "Frank Darabont",
        "cast": "Tim Robbins, Morgan Freeman, Bob Gunton",
        "keywords": "prison, hope, friendship, escape, justice",
        "cinematographer": "Roger Deakins",
        "music": "Thomas Newman",
        "writer": "Frank Darabont",
        "overview": "A banker sentenced to life in Shawshank State Penitentiary forms an unlikely friendship and finds hope through acts of common decency."
    },
    {
        "movie_id": 6,
        "title": "My Neighbor Totoro",
        "genre": [
            "Animation",
            "Fantasy"
        ],
        "experience_type": "relaxing",
        "rating_percent": 88,
        "popularity_score": 0.7,
        "age_limit": 0,
        "netflix_url": "https://www.netflix.com",
        "prime_url": "",
        "year": 1988,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/vOdK4W6AKWxkaK73FMEmGg7qk0B.jpg",
        "synopsis": "Two young girls move to the countryside and befriend playful forest spirits, including the lovable giant creature Totoro.",
        "quote": "Sometimes you just need to sit with a giant, fluffy friend. — Find your quiet place in this noisy world.",
        "trailer": "92a7Hj0ijLs",
        "tags": [
            "family-safe",
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com"
            },
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            }
        ],
        "director": "Hayao Miyazaki",
        "cast": "Noriko Hidaka, Chika Sakamoto, Shigesato Itoi",
        "keywords": "spirits, childhood, nature, countryside, fantasy",
        "cinematographer": "Hisao Shirai",
        "music": "Joe Hisaishi",
        "writer": "Hayao Miyazaki",
        "overview": "Two young girls move to the countryside and befriend playful forest spirits, including the lovable giant creature Totoro."
    },
    {
        "movie_id": 7,
        "title": "Pulp Fiction",
        "genre": [
            "Crime",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 89,
        "popularity_score": 0.9,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B000I9YJ8E",
        "year": 1994,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/dRZpdpKLgN9nk57zggJCs1TjJb4.jpg",
        "synopsis": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        "quote": "The path of the righteous man is beset on all sides. — Life isn't about the destination, it's about the messy journey.",
        "trailer": "s7EdQ4FqbhY",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B000I9YJ8E"
            },
            {
                "name": "Paramount+",
                "url": "https://www.paramountplus.com"
            }
        ],
        "director": "Quentin Tarantino",
        "cast": "John Travolta, Uma Thurman, Samuel L. Jackson",
        "keywords": "crime, nonlinear, violence, dialogue-heavy, cult classic",
        "cinematographer": "Andrzej Sekuła",
        "music": "Various Artists",
        "writer": "Quentin Tarantino",
        "overview": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
        "movie_id": 8,
        "title": "Coco",
        "genre": [
            "Animation",
            "Family",
            "Fantasy"
        ],
        "experience_type": "emotional",
        "rating_percent": 90,
        "popularity_score": 0.8,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 2017,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/55UxVUJE3NKNfjrFt2FDdDmpNCd.jpg",
        "synopsis": "A young boy who dreams of becoming a musician journeys to the Land of the Dead to uncover his family's history.",
        "quote": "Never forget where you come from. — Your roots are the most beautiful part of who you are.",
        "trailer": "Rvr68u6k5sI",
        "tags": [
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com/movies/coco/db9orsI5O4gC"
            }
        ],
        "director": "Lee Unkrich, Adrian Molina",
        "cast": "Anthony Gonzalez, Gael García Bernal, Benjamin Bratt",
        "keywords": "music, family, afterlife, mexican culture, ancestors",
        "cinematographer": "Matt Aspbury, Danielle Feinberg",
        "music": "Michael Giacchino",
        "writer": "Adrian Molina, Matthew Aldrich",
        "overview": "A young boy who dreams of becoming a musician journeys to the Land of the Dead to uncover his family's history."
    },
    {
        "movie_id": 9,
        "title": "Drive",
        "genre": [
            "Action",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 79,
        "popularity_score": 0.7,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B006IMZ0DQ",
        "year": 2011,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/2wlK8Q8pJdyGSk0Y5SqVTjVu3Nk.jpg",
        "synopsis": "A Hollywood stunt driver who moonlights as a getaway driver finds himself in trouble when he helps his neighbour.",
        "quote": "There are no clean getaways. — Some roads look simple, but every choice has a cost.",
        "trailer": "KBiOF3y1W0Y",
        "tags": [
            "cult",
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B006IMZ0DQ"
            },
            {
                "name": "Apple TV",
                "url": "https://tv.apple.com"
            }
        ],
        "director": "Nicolas Winding Refn",
        "cast": "Ryan Gosling, Carey Mulligan, Bryan Cranston",
        "keywords": "getaway driver, stunt, neo-noir, crime, heist",
        "cinematographer": "Newton Thomas Sigel",
        "music": "Cliff Martinez",
        "writer": "Hossein Amini",
        "overview": "A Hollywood stunt driver who moonlights as a getaway driver finds himself in trouble when he helps his neighbour."
    },
    {
        "movie_id": 10,
        "title": "The Secret Life of Walter Mitty",
        "genre": [
            "Adventure",
            "Comedy",
            "Drama"
        ],
        "experience_type": "relaxing",
        "rating_percent": 65,
        "popularity_score": 0.6,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B00IANO1TA",
        "year": 2013,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/67x2nhfCU422tiyLcMgvVmj1K6k.jpg",
        "synopsis": "A daydreamer escapes his anonymous life by disappearing into a world of fantasies of romance, heroism, and action.",
        "quote": "To see the world, things dangerous to come to. To see behind walls, draw closer. — Life begins where your comfort zone ends.",
        "trailer": "QD6cy4PBQPI",
        "tags": [
            "underrated",
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B00IANO1TA"
            }
        ],
        "director": "Ben Stiller",
        "cast": "Ben Stiller, Kristen Wiig, Sean Penn",
        "keywords": "daydream, adventure, photography, iceland, self-discovery",
        "cinematographer": "Stuart Dryburgh",
        "music": "Theodore Shapiro",
        "writer": "Steve Conrad",
        "overview": "A daydreamer escapes his anonymous life by disappearing into a world of fantasies of romance, heroism, and action."
    },
    {
        "movie_id": 11,
        "title": "Interstellar",
        "genre": [
            "Sci-Fi",
            "Drama",
            "Adventure"
        ],
        "experience_type": "emotional",
        "rating_percent": 85,
        "popularity_score": 0.9,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B00TU9UFTS",
        "year": 2014,
        "poster": "https://image.tmdb.org/t/p/w500/xrgBLpPMXWXKdyj5r36RVfmkRdb.jpg",
        "synopsis": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival on a dying Earth.",
        "quote": "We used to look up at the sky and wonder. Now we just look down and worry. — Don't forget to dream big, even when reality weighs you down.",
        "trailer": "zSWdZVtXT7E",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Paramount+",
                "url": "https://www.paramountplus.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B00TU9UFTS"
            }
        ],
        "director": "Christopher Nolan",
        "cast": "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        "keywords": "space, time travel, wormhole, father-daughter, gravity",
        "cinematographer": "Hoyte van Hoytema",
        "music": "Hans Zimmer",
        "writer": "Jonathan Nolan, Christopher Nolan",
        "overview": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival on a dying Earth."
    },
    {
        "movie_id": 12,
        "title": "Spirited Away",
        "genre": [
            "Animation",
            "Fantasy",
            "Adventure"
        ],
        "experience_type": "fun",
        "rating_percent": 96,
        "popularity_score": 0.8,
        "age_limit": 0,
        "netflix_url": "https://www.netflix.com",
        "prime_url": "",
        "year": 2001,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/zAC8iUgWLdCOrZVHJjYUYdGSjdK.jpg",
        "synopsis": "A young girl wanders into a world of spirits ruled by gods, witches, and strange creatures, and must find the courage to free herself and her parents.",
        "quote": "Once you meet someone, you never really forget them. — The people who change your life stay in your heart forever.",
        "trailer": "ByXuk9QqQkk",
        "tags": [
            "cult",
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com"
            },
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            }
        ],
        "director": "Hayao Miyazaki",
        "cast": "Rumi Hiiragi, Miyu Irino, Mari Natsuki",
        "keywords": "animation, spirits, adventure, coming of age, fantasy",
        "cinematographer": "Atsushi Okui",
        "music": "Joe Hisaishi",
        "writer": "Hayao Miyazaki",
        "overview": "A young girl wanders into a world of spirits ruled by gods, witches, and strange creatures, and must find the courage to free herself and her parents."
    },
    {
        "movie_id": 13,
        "title": "The Wolf of Wall Street",
        "genre": [
            "Crime",
            "Comedy",
            "Drama"
        ],
        "experience_type": "fun",
        "rating_percent": 79,
        "popularity_score": 0.9,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B00IIU9FMQ",
        "year": 2013,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/u7ap9592CYZwDfhchLBQtSQHLCf.jpg",
        "synopsis": "Based on the true story of Jordan Belfort, a wealthy stockbroker who ran a massive securities fraud scheme.",
        "quote": "The only thing standing between you and your goal is the story you keep telling yourself. — Stop making excuses. Start making moves.",
        "trailer": "iszwuX1AK6A",
        "tags": [],
        "ottPlatforms": [
            {
                "name": "Paramount+",
                "url": "https://www.paramountplus.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B00IIU9FMQ"
            }
        ],
        "director": "Martin Scorsese",
        "cast": "Leonardo DiCaprio, Jonah Hill, Margot Robbie",
        "keywords": "finance, stock market, excess, greed, biography",
        "cinematographer": "Rodrigo Prieto",
        "music": "Various Artists",
        "writer": "Terence Winter",
        "overview": "Based on the true story of Jordan Belfort, a wealthy stockbroker who ran a massive securities fraud scheme."
    },
    {
        "movie_id": 14,
        "title": "Up",
        "genre": [
            "Animation",
            "Adventure",
            "Comedy"
        ],
        "experience_type": "emotional",
        "rating_percent": 88,
        "popularity_score": 0.8,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 2009,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jX6cvQtuHTejs9HZ7IDEgKV3KDr.jpg",
        "synopsis": "An elderly widower ties thousands of balloons to his house and flies to South America, accidentally taking a young stowaway along for the ride.",
        "quote": "Adventure is out there! — You're never too old to chase your dreams.",
        "trailer": "HWEW_qTLSEE",
        "tags": [
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com/movies/up/3HbSCnQEbir9"
            }
        ],
        "director": "Pete Docter, Bob Peterson",
        "cast": "Ed Asner, Jordan Nagai, Christopher Plummer",
        "keywords": "adventure, balloons, elderly, friendship, paradise",
        "cinematographer": "Patrick Lin, Jean-Claude Kalache",
        "music": "Michael Giacchino",
        "writer": "Pete Docter, Bob Peterson",
        "overview": "An elderly widower ties thousands of balloons to his house and flies to South America, accidentally taking a young stowaway along for the ride."
    },
    {
        "movie_id": 15,
        "title": "Moonlight",
        "genre": [
            "Drama"
        ],
        "experience_type": "emotional",
        "rating_percent": 92,
        "popularity_score": 0.7,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B01MU9CMGP",
        "year": 2016,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/qLnfEmPrDjJfPyyddLJPkXmshkp.jpg",
        "synopsis": "A timeless story of human self-discovery and connection, told across three defining chapters in the life of a young Black man growing up in Miami.",
        "quote": "At some point, you gotta decide for yourself who you gonna be. — Don't let the world write your story for you.",
        "trailer": "9NJj12tJzqc",
        "tags": [
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B01MU9CMGP"
            },
            {
                "name": "Apple TV",
                "url": "https://tv.apple.com"
            }
        ],
        "director": "Barry Jenkins",
        "cast": "Trevante Rhodes, André Holland, Janelle Monáe",
        "keywords": "identity, growing up, poverty, vulnerability, self-discovery",
        "cinematographer": "James Laxton",
        "music": "Nicholas Britell",
        "writer": "Barry Jenkins, Tarell Alvin McCraney",
        "overview": "A timeless story of human self-discovery and connection, told across three defining chapters in the life of a young Black man growing up in Miami."
    },
    {
        "movie_id": 16,
        "title": "The Matrix",
        "genre": [
            "Sci-Fi",
            "Action"
        ],
        "experience_type": "intense",
        "rating_percent": 83,
        "popularity_score": 0.9,
        "age_limit": 16,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B000HAB4KS",
        "year": 1999,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/q4H9IreGqWgQcXq1JvvhcgfSN2w.jpg",
        "synopsis": "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
        "quote": "I know you're out there. I can feel you now. — The reality you accept is the reality you live in. Question everything.",
        "trailer": "vKQi3bBA1y8",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B000HAB4KS"
            }
        ],
        "director": "Lana Wachowski, Lilly Wachowski",
        "cast": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        "keywords": "simulation, cyberpunk, action, rebellion, choice, red pill",
        "cinematographer": "Bill Pope",
        "music": "Don Davis",
        "writer": "Lana Wachowski, Lilly Wachowski",
        "overview": "A computer hacker learns about the true nature of reality and his role in the war against its controllers."
    },
    {
        "movie_id": 17,
        "title": "Lost in Translation",
        "genre": [
            "Drama",
            "Romance"
        ],
        "experience_type": "relaxing",
        "rating_percent": 80,
        "popularity_score": 0.6,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B000IBUPMK",
        "year": 2003,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/3jCLmYDIIiSMPujbwygNpqdpM8N.jpg",
        "synopsis": "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.",
        "quote": "Let's never come here again because it would never be as much fun. — Some moments are perfect precisely because they can't be repeated.",
        "trailer": "W6iVPCRflQM",
        "tags": [
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B000IBUPMK"
            },
            {
                "name": "Apple TV",
                "url": "https://tv.apple.com"
            }
        ],
        "director": "Sofia Coppola",
        "cast": "Bill Murray, Scarlett Johansson, Giovanni Ribisi",
        "keywords": "tokyo, loneliness, connection, culture, melancholy",
        "cinematographer": "Lance Acord",
        "music": "Kevin Shields, Brian Reitzell",
        "writer": "Sofia Coppola",
        "overview": "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo."
    },
    {
        "movie_id": 18,
        "title": "Mad Max: Fury Road",
        "genre": [
            "Action",
            "Sci-Fi"
        ],
        "experience_type": "intense",
        "rating_percent": 90,
        "popularity_score": 0.8,
        "age_limit": 16,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B00ZIFHU9Y",
        "year": 2015,
        "poster": "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
        "synopsis": "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a drifter named Max.",
        "quote": "Oh, what a day! What a lovely day! — When everything burns around you, find something worth fighting for.",
        "trailer": "hEJnMQG9ev8",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B00ZIFHU9Y"
            }
        ],
        "director": "George Miller",
        "cast": "Tom Hardy, Charlize Theron, Nicholas Hoult",
        "keywords": "post-apocalyptic, chase, desert, rebellion, survival",
        "cinematographer": "John Seale",
        "music": "Junkie XL (Tom Holkenborg)",
        "writer": "George Miller, Brendan McCarthy, Nico Lathouris",
        "overview": "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a drifter named Max."
    },
    {
        "movie_id": 19,
        "title": "The Truman Show",
        "genre": [
            "Comedy",
            "Drama"
        ],
        "experience_type": "emotional",
        "rating_percent": 83,
        "popularity_score": 0.8,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B001EBWIPY",
        "year": 1998,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/vuza0WqY239yBXOadKlGwJsZJFE.jpg",
        "synopsis": "An insurance salesman discovers his whole life is actually a giant TV show, and everyone around him is acting.",
        "quote": "We accept the reality of the world with which we are presented. — Break free from the show others have written for you.",
        "trailer": "dlnmQbPGuls",
        "tags": [
            "cult",
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Paramount+",
                "url": "https://www.paramountplus.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B001EBWIPY"
            }
        ],
        "director": "Peter Weir",
        "cast": "Jim Carrey, Laura Linney, Ed Harris",
        "keywords": "reality tv, surveillance, simulation, escape",
        "cinematographer": "Peter Biziou",
        "music": "Burkhard Dallwitz, Philip Glass",
        "writer": "Andrew Niccol",
        "overview": "An insurance salesman discovers his whole life is actually a giant TV show, and everyone around him is acting."
    },
    {
        "movie_id": 20,
        "title": "Amélie",
        "genre": [
            "Romance",
            "Comedy"
        ],
        "experience_type": "fun",
        "rating_percent": 85,
        "popularity_score": 0.7,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B000I9YLWM",
        "year": 2001,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4rHIh0WlZNHE5pOgR31tBeUlJZN.jpg",
        "synopsis": "A shy waitress in Montmartre decides to change the lives of those around her for the better, while struggling with her own isolation.",
        "quote": "Times are hard for dreamers. — But the world needs your kind of crazy. Never stop imagining.",
        "trailer": "HUECWi5pX7o",
        "tags": [
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B000I9YLWM"
            },
            {
                "name": "Apple TV",
                "url": "https://tv.apple.com"
            }
        ],
        "director": "Jean-Pierre Jeunet",
        "cast": "Audrey Tautou, Mathieu Kassovitz, Rufus",
        "keywords": "paris, whimsy, romance, kindness, imagination",
        "cinematographer": "Bruno Delbonnel",
        "music": "Yann Tiersen",
        "writer": "Jean-Pierre Jeunet, Guillaume Laurant",
        "overview": "A shy waitress in Montmartre decides to change the lives of those around her for the better, while struggling with her own isolation."
    },
    {
        "movie_id": 21,
        "title": "Fight Club",
        "genre": [
            "Drama",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 79,
        "popularity_score": 0.9,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B003MAQG9Y",
        "year": 1999,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/b1ONg8Is4l760oryJa7Aw7LdPtM.jpg",
        "synopsis": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more.",
        "quote": "It's only after we've lost everything that we're free to do anything. — Sometimes you have to let go of who you were to become who you need to be.",
        "trailer": "qtRKdVHc-cE",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B003MAQG9Y"
            },
            {
                "name": "Hulu",
                "url": "https://www.hulu.com"
            }
        ],
        "director": "David Fincher",
        "cast": "Brad Pitt, Edward Norton, Helena Bonham Carter",
        "keywords": "anarchy, identity, consumerism, underground, twist",
        "cinematographer": "Jeff Cronenweth",
        "music": "The Dust Brothers",
        "writer": "Jim Uhls",
        "overview": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more."
    },
    {
        "movie_id": 22,
        "title": "Inside Out",
        "genre": [
            "Animation",
            "Comedy",
            "Family"
        ],
        "experience_type": "emotional",
        "rating_percent": 94,
        "popularity_score": 0.8,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 2015,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ayyBTAxL0ONtf8E9ttBLOjf450K.jpg",
        "synopsis": "After young Riley is uprooted from her Midwest life, her emotions — Joy, Fear, Anger, Disgust and Sadness — conflict on how to navigate a new city.",
        "quote": "Do you ever look at someone and wonder: what is going on inside their head? — Be kind. Everyone is fighting battles you can't see.",
        "trailer": "yRUAzGQ3nSY",
        "tags": [
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com/movies/inside-out/2I0bBbhZIbkZ"
            }
        ],
        "director": "Pete Docter, Ronnie del Carmen",
        "cast": "Amy Poehler, Bill Hader, Lewis Black",
        "keywords": "emotions, memory, childhood, moving, feelings",
        "cinematographer": "Patrick Lin",
        "music": "Michael Giacchino",
        "writer": "Pete Docter, Meg LeFauve, Josh Cooley",
        "overview": "After young Riley is uprooted from her Midwest life, her emotions — Joy, Fear, Anger, Disgust and Sadness — conflict on how to navigate a new city."
    },
    {
        "movie_id": 23,
        "title": "No Country for Old Men",
        "genre": [
            "Thriller",
            "Crime"
        ],
        "experience_type": "intense",
        "rating_percent": 86,
        "popularity_score": 0.8,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B0012I8B0Y",
        "year": 2007,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/61qLMfs2CJ5tmtctXvr8LQbLzPl.jpg",
        "synopsis": "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and a suitcase full of cash in the desert.",
        "quote": "You can't stop what's coming. — Life doesn't wait for you to be ready. Keep moving anyway.",
        "trailer": "38A__WT3-o0",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Paramount+",
                "url": "https://www.paramountplus.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B0012I8B0Y"
            }
        ],
        "director": "Joel Coen, Ethan Coen",
        "cast": "Javier Bardem, Josh Brolin, Tommy Lee Jones",
        "keywords": "psychopath, desert, drugs, fate, neo-western",
        "cinematographer": "Roger Deakins",
        "music": "Carter Burwell",
        "writer": "Joel Coen, Ethan Coen",
        "overview": "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and a suitcase full of cash in the desert."
    },
    {
        "movie_id": 24,
        "title": "WALL-E",
        "genre": [
            "Animation",
            "Sci-Fi",
            "Family"
        ],
        "experience_type": "relaxing",
        "rating_percent": 95,
        "popularity_score": 0.8,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 2008,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/fLXLNDsOBZxpNleWF9Z4hubxBUQ.jpg",
        "synopsis": "In a distant future, a small waste-collecting robot inadvertently embarks on a space journey that will decide the fate of mankind.",
        "quote": "I don't want to survive. I want to live. — Existing isn't enough. Make every day count.",
        "trailer": "alIq_wG9FNk",
        "tags": [
            "family-safe",
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com/movies/wall-e/5G1wpZC2Lb6I"
            }
        ],
        "director": "Andrew Stanton",
        "cast": "Ben Burtt, Elissa Knight, Jeff Garlin",
        "keywords": "robot, earth, space, environment, love, dystopia",
        "cinematographer": "Jeremy Lasky, Danielle Feinberg",
        "music": "Thomas Newman",
        "writer": "Andrew Stanton, Pete Docter",
        "overview": "In a distant future, a small waste-collecting robot inadvertently embarks on a space journey that will decide the fate of mankind."
    },
    {
        "movie_id": 25,
        "title": "Her",
        "genre": [
            "Sci-Fi",
            "Romance",
            "Drama"
        ],
        "experience_type": "emotional",
        "rating_percent": 82,
        "popularity_score": 0.7,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B00HHJR5PO",
        "year": 2013,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jpWcLPddK2gZEl09HBY17zeZtdC.jpg",
        "synopsis": "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
        "quote": "The past is just a story we tell ourselves. — You are not your mistakes. You are what you choose to be next.",
        "trailer": "ne6p6MfLBxc",
        "tags": [
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B00HHJR5PO"
            },
            {
                "name": "Apple TV",
                "url": "https://tv.apple.com"
            }
        ],
        "director": "Spike Jonze",
        "cast": "Joaquin Phoenix, Scarlett Johansson, Amy Adams",
        "keywords": "artificial intelligence, loneliness, futuristic, love, technology",
        "cinematographer": "Hoyte van Hoytema",
        "music": "Arcade Fire, Owen Pallett",
        "writer": "Spike Jonze",
        "overview": "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need."
    },
    {
        "movie_id": 26,
        "title": "The Dark Knight",
        "genre": [
            "Action",
            "Crime",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 90,
        "popularity_score": 1,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B001I189MG",
        "year": 2008,
        "poster": "https://image.tmdb.org/t/p/w500/pKKvCaL1TPTVtbI6EeliyND3api.jpg",
        "synopsis": "Batman raises the stakes in his war on crime, facing off against the Joker, a criminal mastermind who wreaks havoc on Gotham City.",
        "quote": "Why so serious? — The world will test you. Don't lose your sense of self in the process.",
        "trailer": "EXeTwQWrcwY",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B001I189MG"
            }
        ],
        "director": "Christopher Nolan",
        "cast": "Christian Bale, Heath Ledger, Aaron Eckhart",
        "keywords": "batman, joker, vigilante, chaos, justice, superhero",
        "cinematographer": "Wally Pfister",
        "music": "Hans Zimmer, James Newton Howard",
        "writer": "Jonathan Nolan, Christopher Nolan",
        "overview": "Batman raises the stakes in his war on crime, facing off against the Joker, a criminal mastermind who wreaks havoc on Gotham City."
    },
    {
        "movie_id": 27,
        "title": "Paddington 2",
        "genre": [
            "Comedy",
            "Family",
            "Adventure"
        ],
        "experience_type": "fun",
        "rating_percent": 93,
        "popularity_score": 0.7,
        "age_limit": 0,
        "netflix_url": "https://www.netflix.com",
        "prime_url": "https://www.amazon.com/dp/B079DZ5XWD",
        "year": 2017,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4bxacqeWIrOFNwpGjsDbWWQIbkM.jpg",
        "synopsis": "Paddington, now settled with the Brown family in London, picks up a series of odd jobs to buy the perfect present, but must clear his name when the gift is stolen.",
        "quote": "If we're kind and polite, the world will be right. — A little kindness goes a long way, even when the world doesn't deserve it.",
        "trailer": "52x5HJ9H8DM",
        "tags": [
            "family-safe",
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B079DZ5XWD"
            }
        ],
        "director": "Paul King",
        "cast": "Ben Whishaw, Hugh Grant, Hugh Bonneville",
        "keywords": "bear, london, family, kindness, prison, adventure",
        "cinematographer": "Erik Wilson",
        "music": "Dario Marianelli",
        "writer": "Paul King, Simon Farnaby",
        "overview": "Paddington, now settled with the Brown family in London, picks up a series of odd jobs to buy the perfect present, but must clear his name when the gift is stolen."
    },
    {
        "movie_id": 28,
        "title": "Eternal Sunshine of the Spotless Mind",
        "genre": [
            "Romance",
            "Drama",
            "Sci-Fi"
        ],
        "experience_type": "emotional",
        "rating_percent": 82,
        "popularity_score": 0.8,
        "age_limit": 16,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B000JLQUZI",
        "year": 2004,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
        "synopsis": "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
        "quote": "How happy is the blameless soul's lot! — Forgetting someone doesn't erase what they meant to you.",
        "trailer": "07-QBnEkgXU",
        "tags": [
            "cult",
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Peacock",
                "url": "https://www.peacocktv.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B000JLQUZI"
            }
        ],
        "director": "Michel Gondry",
        "cast": "Jim Carrey, Kate Winslet, Kirsten Dunst",
        "keywords": "memory, breakup, romance, sci-fi, surreal",
        "cinematographer": "Ellen Kuras",
        "music": "Jon Brion",
        "writer": "Charlie Kaufman",
        "overview": "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories."
    },
    {
        "movie_id": 29,
        "title": "John Wick",
        "genre": [
            "Action",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 75,
        "popularity_score": 0.8,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B00R0291Q2",
        "year": 2014,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gJweH2tfq3T02u4noIcwVJuDJMf.jpg",
        "synopsis": "An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
        "quote": "People keep asking if I'm back. Yeah, I'm thinking I'm back. — When life knocks you down, come back stronger than ever.",
        "trailer": "2AUmvWm5ZDQ",
        "tags": [],
        "ottPlatforms": [
            {
                "name": "Peacock",
                "url": "https://www.peacocktv.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B00R0291Q2"
            }
        ],
        "director": "Chad Stahelski, David Leitch",
        "cast": "Keanu Reeves, Michael Nyqvist, Alfie Allen",
        "keywords": "assassin, revenge, action, underworld, dog",
        "cinematographer": "Jonathan Sela",
        "music": "Tyler Bates, Joel J. Richard",
        "writer": "Derek Kolstad",
        "overview": "An ex-hitman comes out of retirement to track down the gangsters that killed his dog and took everything from him."
    },
    {
        "movie_id": 30,
        "title": "Ratatouille",
        "genre": [
            "Animation",
            "Comedy",
            "Family"
        ],
        "experience_type": "fun",
        "rating_percent": 92,
        "popularity_score": 0.8,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 2007,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/sJoAryb5gSh842U5fwkhAAEdNqP.jpg",
        "synopsis": "A rat named Remy dreams of becoming a great chef and tries to achieve his goal by forming an alliance with a Parisian restaurant's garbage boy.",
        "quote": "Not everyone can become a great artist, but a great artist can come from anywhere. — Never let anyone tell you that your background defines your limits.",
        "trailer": "NgsQ8mVkN8w",
        "tags": [
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com/movies/ratatouille/39wmItIWsg5s"
            }
        ],
        "director": "Brad Bird, Jan Pinkava",
        "cast": "Patton Oswalt, Ian Holm, Lou Romano",
        "keywords": "cooking, chef, paris, rat, passion, food",
        "cinematographer": "Robert Anderson, Sharon Calahan",
        "music": "Michael Giacchino",
        "writer": "Brad Bird, Jan Pinkava",
        "overview": "A rat named Remy dreams of becoming a great chef and tries to achieve his goal by forming an alliance with a Parisian restaurant's garbage boy."
    },
    {
        "movie_id": 31,
        "title": "The Departed",
        "genre": [
            "Crime",
            "Thriller",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 85,
        "popularity_score": 0.8,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B000P0J0AI",
        "year": 2006,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ks08wfYw9hBdxxqaGdenQryR9mK.jpg",
        "synopsis": "An undercover cop and a mole in the police try to identify each other while infiltrating an Irish gang in Boston.",
        "quote": "When you're facing a loaded gun, what's the difference? — Trust is fragile. Once broken, the game changes forever.",
        "trailer": "o25VXTr6VH8",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B000P0J0AI"
            }
        ],
        "director": "Martin Scorsese",
        "cast": "Leonardo DiCaprio, Matt Damon, Jack Nicholson",
        "keywords": "undercover, mob, boston, betrayal, police",
        "cinematographer": "Michael Ballhaus",
        "music": "Howard Shore",
        "writer": "William Monahan",
        "overview": "An undercover cop and a mole in the police try to identify each other while infiltrating an Irish gang in Boston."
    },
    {
        "movie_id": 32,
        "title": "Howl's Moving Castle",
        "genre": [
            "Animation",
            "Fantasy",
            "Romance"
        ],
        "experience_type": "relaxing",
        "rating_percent": 87,
        "popularity_score": 0.7,
        "age_limit": 0,
        "netflix_url": "https://www.netflix.com",
        "prime_url": "",
        "year": 2004,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/mEh0NFn1C3PdbLScbooFMoaM5ET.jpg",
        "synopsis": "When a young hat-maker is turned into an old woman by a witch's curse, she finds refuge in the magical moving castle of the wizard Howl.",
        "quote": "A heart's a heavy burden. — Love isn't always easy, but it's always worth the weight.",
        "trailer": "iwROgK94zcM",
        "tags": [
            "family-safe",
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com"
            },
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            }
        ],
        "director": "Hayao Miyazaki",
        "cast": "Chieko Baishō, Takuya Kimura, Akihiro Miwa",
        "keywords": "wizard, castle, curse, war, magic, transformation",
        "cinematographer": "Atsushi Okui",
        "music": "Joe Hisaishi",
        "writer": "Hayao Miyazaki",
        "overview": "When a young hat-maker is turned into an old woman by a witch's curse, she finds refuge in the magical moving castle of the wizard Howl."
    },
    {
        "movie_id": 33,
        "title": "Parasite",
        "genre": [
            "Thriller",
            "Drama",
            "Comedy"
        ],
        "experience_type": "intense",
        "rating_percent": 96,
        "popularity_score": 0.9,
        "age_limit": 16,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B07YM14FPF",
        "year": 2019,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        "synopsis": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        "quote": "They're not cockroaches. You can't just stamp on them. — The divide between rich and poor is a wound that never stops bleeding.",
        "trailer": "SEUXfv87Wpk",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Hulu",
                "url": "https://www.hulu.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B07YM14FPF"
            }
        ],
        "director": "Bong Joon-ho",
        "cast": "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
        "keywords": "class struggle, family, deception, social commentary, thriller",
        "cinematographer": "Hong Kyung-pyo",
        "music": "Jung Jae-il",
        "writer": "Bong Joon-ho, Han Jin-won",
        "overview": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
    },
    {
        "movie_id": 34,
        "title": "Before Sunrise",
        "genre": [
            "Romance",
            "Drama"
        ],
        "experience_type": "relaxing",
        "rating_percent": 81,
        "popularity_score": 0.6,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B00AEFXVYM",
        "year": 1995,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/6Z0OyJGlZwjWWOx6nPfEB2m9mqM.jpg",
        "synopsis": "A young man and woman meet on a train and end up spending one romantic evening together in Vienna before going their separate ways.",
        "quote": "Isn't everything we do in life a way to be loved a little more? — At the end of the day, all anyone really wants is connection.",
        "trailer": "6MUcuqbGTxc",
        "tags": [
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B00AEFXVYM"
            },
            {
                "name": "Apple TV",
                "url": "https://tv.apple.com"
            }
        ],
        "director": "Richard Linklater",
        "cast": "Ethan Hawke, Julie Delpy",
        "keywords": "vienna, train, conversation, romance, philosophy",
        "cinematographer": "Lee Daniel",
        "music": "Johann Strauss II (Various Artists)",
        "writer": "Richard Linklater, Kim Krizan",
        "overview": "A young man and woman meet on a train and end up spending one romantic evening together in Vienna before going their separate ways."
    },
    {
        "movie_id": 35,
        "title": "Whiplash",
        "genre": [
            "Drama",
            "Music"
        ],
        "experience_type": "intense",
        "rating_percent": 94,
        "popularity_score": 0.8,
        "age_limit": 16,
        "netflix_url": "https://www.netflix.com",
        "prime_url": "https://www.amazon.com/dp/B00QGHB8D0",
        "year": 2014,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
        "synopsis": "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an abusive instructor.",
        "quote": "There are no two words more harmful than 'good job'. — Greatness demands discomfort. Comfort is the enemy of growth.",
        "trailer": "7d_jQycdQGo",
        "tags": [
            "cult",
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B00QGHB8D0"
            }
        ],
        "director": "Damien Chazelle",
        "cast": "Miles Teller, J.K. Simmons, Paul Reiser",
        "keywords": "jazz, drumming, ambition, obsession, perfection",
        "cinematographer": "Sharone Meir",
        "music": "Justin Hurwitz",
        "writer": "Damien Chazelle",
        "overview": "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an abusive instructor."
    },
    {
        "movie_id": 36,
        "title": "Soul",
        "genre": [
            "Animation",
            "Fantasy",
            "Comedy"
        ],
        "experience_type": "emotional",
        "rating_percent": 89,
        "popularity_score": 0.7,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 2020,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/pEz5aROvfy5FBW1OTlrDO3VryWO.jpg",
        "synopsis": "A middle-school music teacher's passion for jazz leads him on an extraordinary journey to discover what it means to have a soul.",
        "quote": "Is all this living really worth dying for? — What makes life meaningful isn't the achievement — it's the passion.",
        "trailer": "xOsLIiBStEs",
        "tags": [
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com/movies/soul/77tlWpb1AWsC"
            }
        ],
        "director": "Pete Docter, Kemp Powers",
        "cast": "Jamie Foxx, Tina Fey, Graham Norton",
        "keywords": "jazz, soul, meaning of life, passion, afterlife",
        "cinematographer": "Matt Aspbury, Ian Megibben",
        "music": "Trent Reznor, Atticus Ross, Jon Batiste",
        "writer": "Pete Docter, Mike Jones, Kemp Powers",
        "overview": "A middle-school music teacher's passion for jazz leads him on an extraordinary journey to discover what it means to have a soul."
    },
    {
        "movie_id": 37,
        "title": "Goodfellas",
        "genre": [
            "Crime",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 87,
        "popularity_score": 0.9,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B0011TNRNE",
        "year": 1990,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        "synopsis": "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
        "quote": "As far back as I can remember, I always wanted to be a gangster. — We all chase versions of success. Make sure yours doesn't cost you everything.",
        "trailer": "2ilzidi_J8Q",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B0011TNRNE"
            }
        ],
        "director": "Martin Scorsese",
        "cast": "Robert De Niro, Ray Liotta, Joe Pesci",
        "keywords": "mafia, gangster, true story, crime, rise and fall",
        "cinematographer": "Michael Ballhaus",
        "music": "Various Artists",
        "writer": "Nicholas Pileggi, Martin Scorsese",
        "overview": "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners."
    },
    {
        "movie_id": 38,
        "title": "The Princess Bride",
        "genre": [
            "Adventure",
            "Comedy",
            "Fantasy"
        ],
        "experience_type": "fun",
        "rating_percent": 84,
        "popularity_score": 0.8,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B00AOT8JUC",
        "year": 1987,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/whF3YddFYSwJNuHEvi5lpsnty2l.jpg",
        "synopsis": "A farmhand-turned-pirate encounters numerous obstacles, enemies, and allies in his quest to be reunited with his true love.",
        "quote": "As you wish. — True love doesn't need grand gestures. Sometimes three simple words say it all.",
        "trailer": "WNNUcHRiPS8",
        "tags": [
            "cult",
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B00AOT8JUC"
            }
        ],
        "director": "Rob Reiner",
        "cast": "Cary Elwes, Robin Wright, Mandy Patinkin",
        "keywords": "fairy tale, true love, sword fighting, comedy, rescue",
        "cinematographer": "Adrian Biddle",
        "music": "Mark Knopfler",
        "writer": "William Goldman",
        "overview": "A farmhand-turned-pirate encounters numerous obstacles, enemies, and allies in his quest to be reunited with his true love."
    },
    {
        "movie_id": 39,
        "title": "A Quiet Place",
        "genre": [
            "Horror",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 80,
        "popularity_score": 0.7,
        "age_limit": 16,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B07BZ5HMTH",
        "year": 2018,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/y9rmcpivS4rwfyZfxPqtlmAzCa.jpg",
        "synopsis": "A family is forced to live in silence while hiding from creatures that hunt by sound, finding new ways to survive in a post-apocalyptic world.",
        "quote": "If they hear you, they hunt you. — In a world full of noise, sometimes silence is your greatest strength.",
        "trailer": "WR7cc5t7tv8",
        "tags": [
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Paramount+",
                "url": "https://www.paramountplus.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B07BZ5HMTH"
            }
        ],
        "director": "John Krasinski",
        "cast": "Emily Blunt, John Krasinski, Millicent Simmonds",
        "keywords": "silence, creatures, survival, family, horror",
        "cinematographer": "Charlotte Bruus Christensen",
        "music": "Marco Beltrami",
        "writer": "Bryan Woods, Scott Beck, John Krasinski",
        "overview": "A family is forced to live in silence while hiding from creatures that hunt by sound, finding new ways to survive in a post-apocalyptic world."
    },
    {
        "movie_id": 40,
        "title": "The Lion King",
        "genre": [
            "Animation",
            "Adventure",
            "Family"
        ],
        "experience_type": "emotional",
        "rating_percent": 88,
        "popularity_score": 0.9,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 1994,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/CcXYha6szaGHWEsHFhbWz9PICZ.jpg",
        "synopsis": "A young lion prince flees his kingdom after the murder of his father, only to learn the true meaning of responsibility and bravery.",
        "quote": "Remember who you are. — When life makes you forget your worth, look inside — your strength was always there.",
        "trailer": "4sj1MT05lAA",
        "tags": [
            "cult",
            "family-safe"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+",
                "url": "https://www.disneyplus.com/movies/the-lion-king/1HqwiEcje6Nj"
            }
        ],
        "director": "Roger Allers, Rob Minkoff",
        "cast": "Matthew Broderick, James Earl Jones, Jeremy Irons",
        "keywords": "lion, africa, kingdom, destiny, coming of age",
        "cinematographer": "N/A (Animation)",
        "music": "Hans Zimmer, Elton John",
        "writer": "Irene Mecchi, Jonathan Roberts, Linda Woolverton",
        "overview": "A young lion prince flees his kingdom after the murder of his father, only to learn the true meaning of responsibility and bravery."
    },
    {
        "movie_id": 41,
        "title": "Dune",
        "genre": [
            "Sci-Fi",
            "Adventure"
        ],
        "experience_type": "intense",
        "rating_percent": 83,
        "popularity_score": 0.95,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B09J5D7GV1",
        "year": 2021,
        "poster": "https://image.tmdb.org/t/p/w500/sFkbIbsH9bOMrwur55ZpYQ29Ekd.jpg",
        "synopsis": "Paul Atreides, a brilliant and gifted young man, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
        "quote": "Fear is the mind-killer. — Courage isn't the absence of fear. It's choosing to move forward despite it.",
        "trailer": "8g18jFHCLXk",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B09J5D7GV1"
            }
        ],
        "director": "Denis Villeneuve",
        "cast": "Timothée Chalamet, Rebecca Ferguson, Oscar Isaac",
        "keywords": "desert, spice, empire, prophecy, political",
        "cinematographer": "Greig Fraser",
        "music": "Hans Zimmer",
        "writer": "Jon Spaihts, Denis Villeneuve, Eric Roth",
        "overview": "Paul Atreides, a brilliant and gifted young man, must travel to the most dangerous planet in the universe to ensure the future of his family and his people."
    },
    {
        "movie_id": 42,
        "title": "Everything Everywhere All at Once",
        "genre": [
            "Sci-Fi",
            "Comedy",
            "Action"
        ],
        "experience_type": "fun",
        "rating_percent": 89,
        "popularity_score": 0.9,
        "age_limit": 16,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B09X5XHHKD",
        "year": 2022,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8z93FvxClC5GIq7OLyN0MaOohQB.jpg",
        "synopsis": "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes.",
        "quote": "Every rejection, every disappointment has led you here. — Your struggles aren't setbacks — they're setup for something bigger.",
        "trailer": "wxN1T1uxQ2g",
        "tags": [
            "cult",
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B09X5XHHKD"
            }
        ],
        "director": "Daniel Kwan, Daniel Scheinert",
        "cast": "Michelle Yeoh, Stephanie Hsu, Ke Huy Quan",
        "keywords": "multiverse, family, martial arts, surreal, absurd",
        "cinematographer": "Larkin Seiple",
        "music": "Son Lux",
        "writer": "Daniel Kwan, Daniel Scheinert",
        "overview": "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes."
    },
    {
        "movie_id": 43,
        "title": "The Batman",
        "genre": [
            "Action",
            "Crime",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 85,
        "popularity_score": 0.88,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 2022,
        "poster": "https://image.tmdb.org/t/p/w500/7YncShtIGNJP5euTPSZGxGsImaN.jpg",
        "synopsis": "When a sadistic serial killer begins murdering key political figures, Batman is forced to investigate the city's hidden corruption.",
        "quote": "I'm vengeance. — Anger can drive you, but it's justice and purpose that give life meaning.",
        "trailer": "mqqft2x_Aa4",
        "tags": [],
        "ottPlatforms": [
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            }
        ],
        "director": "Matt Reeves",
        "cast": "Robert Pattinson, Zoë Kravitz, Paul Dano",
        "keywords": "batman, detective, gothic, riddler, corruption, noir",
        "cinematographer": "Greig Fraser",
        "music": "Michael Giacchino",
        "writer": "Matt Reeves, Peter Craig",
        "overview": "When a sadistic serial killer begins murdering key political figures, Batman is forced to investigate the city's hidden corruption."
    },
    {
        "movie_id": 44,
        "title": "Top Gun: Maverick",
        "genre": [
            "Action",
            "Drama"
        ],
        "experience_type": "fun",
        "rating_percent": 88,
        "popularity_score": 0.92,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B0B2KSYRLQ",
        "year": 2022,
        "poster": "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
        "synopsis": "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission.",
        "quote": "It's not the plane, it's the pilot. — The tools don't make the master. Your heart and skill do.",
        "trailer": "giXco2jaZ_4",
        "tags": [],
        "ottPlatforms": [
            {
                "name": "Paramount+",
                "url": "https://www.paramountplus.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B0B2KSYRLQ"
            }
        ],
        "director": "Joseph Kosinski",
        "cast": "Tom Cruise, Miles Teller, Jennifer Connelly",
        "keywords": "navy, fighter jet, pilot, legacy, aviation",
        "cinematographer": "Claudio Miranda",
        "music": "Harold Faltermeyer, Hans Zimmer, Lorne Balfe",
        "writer": "Ehren Kruger, Eric Warren Singer, Christopher McQuarrie",
        "overview": "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission."
    },
    {
        "movie_id": 45,
        "title": "La La Land",
        "genre": [
            "Comedy",
            "Drama",
            "Romance"
        ],
        "experience_type": "emotional",
        "rating_percent": 80,
        "popularity_score": 0.82,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com",
        "prime_url": "",
        "year": 2016,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
        "synopsis": "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
        "quote": "Here's to the ones who dream, foolish as they may seem. — The world needs more dreamers, not fewer. Keep believing.",
        "trailer": "0pdqf4P9MB8",
        "tags": [],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com"
            }
        ],
        "director": "Damien Chazelle",
        "cast": "Ryan Gosling, Emma Stone, John Legend",
        "keywords": "musical, romance, jazz, dreams, hollywood",
        "cinematographer": "Linus Sandgren",
        "music": "Justin Hurwitz",
        "writer": "Damien Chazelle",
        "overview": "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future."
    },
    {
        "movie_id": 46,
        "title": "Spider-Man: Into the Spider-Verse",
        "genre": [
            "Animation",
            "Action",
            "Adventure"
        ],
        "experience_type": "fun",
        "rating_percent": 84,
        "popularity_score": 0.88,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2018,
        "poster": "https://image.tmdb.org/t/p/w500/AeGrue5mIPMPoS2U7htptMvjfwZ.jpg",
        "synopsis": "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
        "quote": "Anyone can wear the mask. — You don't have to be perfect to be a hero. Just show up.",
        "trailer": "g4Hbz2jLxvQ",
        "tags": [
            "family-safe",
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Peter Ramsey, Robert Persichetti Jr., Rodney Rothman",
        "cast": "Shameik Moore, Jake Johnson, Hailee Steinfeld",
        "keywords": "spider-man, multiverse, animation, superhero, style",
        "cinematographer": "N/A (Animation)",
        "music": "Daniel Pemberton",
        "writer": "Phil Lord, Rodney Rothman",
        "overview": "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities."
    },
    {
        "movie_id": 47,
        "title": "Knives Out",
        "genre": [
            "Comedy",
            "Crime",
            "Drama"
        ],
        "experience_type": "fun",
        "rating_percent": 79,
        "popularity_score": 0.81,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B082L42V5B",
        "year": 2019,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/3vldwDuMGJvZIx7e0a3AULGCjee.jpg",
        "synopsis": "A detective investigates the death of a patriarch of an eccentric, combative family.",
        "quote": "I suspect foul play. — Look beneath the surface. Things aren't always what they seem.",
        "trailer": "qGqiHJTsRkQ",
        "tags": [],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B082L42V5B"
            }
        ],
        "director": "Rian Johnson",
        "cast": "Daniel Craig, Chris Evans, Ana de Armas",
        "keywords": "murder mystery, whodunnit, family, inheritance, detective",
        "cinematographer": "Steve Yedlin",
        "music": "Nathan Johnson",
        "writer": "Rian Johnson",
        "overview": "A detective investigates the death of a patriarch of an eccentric, combative family."
    },
    {
        "movie_id": 48,
        "title": "Gladiator",
        "genre": [
            "Action",
            "Adventure",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 85,
        "popularity_score": 0.84,
        "age_limit": 16,
        "netflix_url": "https://www.netflix.com",
        "prime_url": "https://www.amazon.com/dp/B000I9URAS",
        "year": 2000,
        "poster": "https://image.tmdb.org/t/p/w500/mZ3NNmHsdf3HGdHDDQLT6aJAe2c.jpg",
        "synopsis": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
        "quote": "What we do in life echoes in eternity. — Your actions today write the legacy of tomorrow.",
        "trailer": "owK1qxDselE",
        "tags": [
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B000I9URAS"
            }
        ],
        "director": "Ridley Scott",
        "cast": "Russell Crowe, Joaquin Phoenix, Connie Nielsen",
        "keywords": "roman empire, arena, revenge, honor, slavery",
        "cinematographer": "John Mathieson",
        "music": "Hans Zimmer, Lisa Gerrard",
        "writer": "David Franzoni, John Logan, William Nicholson",
        "overview": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery."
    },
    {
        "movie_id": 49,
        "title": "Arrival",
        "genre": [
            "Drama",
            "Sci-Fi"
        ],
        "experience_type": "emotional",
        "rating_percent": 79,
        "popularity_score": 0.77,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com",
        "prime_url": "",
        "year": 2016,
        "poster": "https://image.tmdb.org/t/p/w500/nPd1q0E7UMwfuWOwNWqKakh0JBh.jpg",
        "synopsis": "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
        "quote": "If you could see your whole life laid out, would you change things? — Every ending is also a beginning. Trust the journey.",
        "trailer": "tFMo3UJ4B4g",
        "tags": [
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com"
            },
            {
                "name": "Paramount+",
                "url": "https://www.paramountplus.com"
            }
        ],
        "director": "Denis Villeneuve",
        "cast": "Amy Adams, Jeremy Renner, Forest Whitaker",
        "keywords": "aliens, linguistics, time, communication, sci-fi",
        "cinematographer": "Bradford Young",
        "music": "Jóhann Jóhannsson",
        "writer": "Eric Heisserer",
        "overview": "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world."
    },
    {
        "movie_id": 50,
        "title": "Ex Machina",
        "genre": [
            "Drama",
            "Sci-Fi",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 77,
        "popularity_score": 0.75,
        "age_limit": 16,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2014,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/6tM0TSxkAccnnNHZaVG1299pdMc.jpg",
        "synopsis": "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.",
        "tags": [
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Alex Garland",
        "cast": "Domhnall Gleeson, Alicia Vikander, Oscar Isaac",
        "keywords": "artificial intelligence, turing test, robot, consciousness, isolation",
        "cinematographer": "Rob Hardy",
        "music": "Geoff Barrow, Ben Salisbury",
        "writer": "Alex Garland",
        "quote": "One day the AIs are going to look back on us the same way we look at fossils. — Progress without empathy is just destruction in disguise.",
        "trailer": "EoQuVnKhxaM",
        "overview": "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I."
    },
    {
        "movie_id": 51,
        "title": "Joker",
        "genre": [
            "Crime",
            "Drama",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 84,
        "popularity_score": 0.88,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2019,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        "synopsis": "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
        "tags": [],
        "ottPlatforms": [
            {
                "name": "HBO Max",
                "url": "https://www.hbomax.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Todd Phillips",
        "cast": "Joaquin Phoenix, Robert De Niro, Zazie Beetz",
        "keywords": "mental health, clown, social decay, origin story, gritty",
        "cinematographer": "Lawrence Sher",
        "music": "Hildur Guðnadóttir",
        "writer": "Todd Phillips, Scott Silver",
        "quote": "All I have are negative thoughts. — Be gentle with yourself. The world is heavy enough without fighting your own mind too.",
        "trailer": "zAGVQLHvwOY",
        "overview": "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime."
    },
    {
        "movie_id": 52,
        "title": "Kadaisi Ulaga Por",
        "genre": [
            "Action",
            "Sci-Fi",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 82,
        "popularity_score": 0.85,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.primevideo.com/detail/Kadaisi-Ulaga-Por/0G6L4B9J8GMN0QRNLA7U1T3SVV",
        "year": 2024,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/5QMqnVJk2whlN2OB6zxAKHxjxXO.jpg",
        "synopsis": "Set in a dystopian future, a group of rebels fights against an oppressive regime in the last world war.",
        "quote": "The war isn't over until the last man stands. — In the face of extinction, resistance is survival.",
        "trailer": "Mn9FCMSOuHY",
        "tags": [
            "modern",
            "dystopian"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.primevideo.com/detail/Kadaisi-Ulaga-Por/0G6L4B9J8GMN0QRNLA7U1T3SVV"
            }
        ],
        "director": "Hiphop Tamizha Adhi",
        "cast": "Hiphop Tamizha Adhi, Anagha, Natarajan Subramaniam",
        "keywords": "dystopia, war, futuristic, rebellion, chennai",
        "cinematographer": "Arjun Raja",
        "music": "Hiphop Tamizha",
        "writer": "Hiphop Tamizha Adhi",
        "overview": "Set in a dystopian future, a group of rebels fights against an oppressive regime in the last world war."
    },
    {
        "movie_id": 53,
        "title": "Love Today",
        "genre": [
            "Comedy",
            "Romance",
            "Drama"
        ],
        "experience_type": "fun",
        "rating_percent": 85,
        "popularity_score": 0.92,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com/title/81643110",
        "prime_url": "",
        "year": 2022,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/bzMz4CYlDhcGc2ysTnLryJFNvFe.jpg",
        "synopsis": "A young couple is forced to swap their smartphones for 24 hours to prove their loyalty to each other before getting married.",
        "quote": "Trust is better than truth. — Sometimes the things we hide define the people we love.",
        "trailer": "FaQe8JFGdaM",
        "tags": [
            "modern",
            "youth",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/81643110"
            }
        ],
        "director": "Pradeep Ranganathan",
        "cast": "Pradeep Ranganathan, Ivana, Sathyaraj, Yogi Babu",
        "keywords": "smartphone, trust, relationship, modern love, comedy",
        "cinematographer": "Dinesh Purushothaman",
        "music": "Yuvan Shankar Raja",
        "writer": "Pradeep Ranganathan",
        "overview": "A young couple is forced to swap their smartphones for 24 hours to prove their loyalty to each other before getting married."
    },
    {
        "movie_id": 54,
        "title": "The Goat Life (Aadujeevitham)",
        "genre": [
            "Adventure",
            "Drama",
            "Survival"
        ],
        "experience_type": "emotional",
        "rating_percent": 88,
        "popularity_score": 0.89,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com/title/81643111",
        "prime_url": "",
        "year": 2024,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/95p65Eb3meuWj8DhldOeIz3NLPF.jpg",
        "synopsis": "Based on a true story, an Indian immigrant worker gets trapped in the deserts of Saudi Arabia as a goatherd.",
        "quote": "Freedom is the only destination. — Hope is the only light in the darkest desert.",
        "trailer": "qvsiJKdDxPs",
        "tags": [
            "biopic",
            "epic",
            "survival"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/81643111"
            }
        ],
        "director": "Blessy",
        "cast": "Prithviraj Sukumaran, Amala Paul, Jimmy Jean-Louis",
        "keywords": "desert, survival, immigrant, struggle, goats",
        "cinematographer": "Sunil K. S.",
        "music": "A. R. Rahman",
        "writer": "Blessy",
        "overview": "Based on a true story, an Indian immigrant worker gets trapped in the deserts of Saudi Arabia as a goatherd."
    },
    {
        "movie_id": 55,
        "title": "Lubber Pandhu",
        "genre": [
            "Drama",
            "Sports"
        ],
        "experience_type": "fun",
        "rating_percent": 84,
        "popularity_score": 0.82,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2024,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/jNyLZjIgaYVkBli2JihHwABlAPY.jpg",
        "synopsis": "A lighthearted sports drama centered around street cricket and the rivalry between two skilled players.",
        "quote": "Cricket is more than just a game; it's a heartbeat. — Every ball is a lesson, every hit is a triumph.",
        "trailer": "oP88LHBukW8",
        "tags": [
            "modern",
            "sports",
            "rural"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Tamizharasan Pachamuthu",
        "cast": "Harish Kalyan, Attakathi Dinesh, Sanjana Krishnamoorthy",
        "keywords": "cricket, village, rivalry, rubber ball, friendship",
        "cinematographer": "Dinesh Purushothaman",
        "music": "Sean Roldan",
        "writer": "Tamizharasan Pachamuthu",
        "overview": "A lighthearted sports drama centered around street cricket and the rivalry between two skilled players."
    },
    {
        "movie_id": 56,
        "title": "Garudan",
        "genre": [
            "Action",
            "Drama",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 80,
        "popularity_score": 0.84,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2024,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/xLBfXgJAKYqUQmq8HkD9CUFiaMm.jpg",
        "synopsis": "A loyal henchman finds himself caught between his childhood friend and a righteous man in a web of betrayal.",
        "quote": "Loyalty can be a cage, but truth is the key. — Justice waits for no man.",
        "trailer": "B2yC1jpAYvQ",
        "tags": [
            "modern",
            "rural",
            "action"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "R. S. Durai Senthilkumar",
        "cast": "Soori, M. Sasikumar, Unni Mukundan",
        "keywords": "loyalty, betrayal, rural, justice, temple",
        "cinematographer": "Arthur A. Wilson",
        "music": "Yuvan Shankar Raja",
        "writer": "R. S. Durai Senthilkumar, Vetrimaaran",
        "overview": "A loyal henchman finds himself caught between his childhood friend and a righteous man in a web of betrayal."
    },
    {
        "movie_id": 57,
        "title": "Vaagai Sooda Vaa",
        "genre": [
            "Drama",
            "Period"
        ],
        "experience_type": "emotional",
        "rating_percent": 86,
        "popularity_score": 0.75,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2011,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/xYv0VsgkvHXcyorhQkcLFADTAAi.jpg",
        "synopsis": "A young teacher goes to a remote village to educate children working in brick kilns, only to discover the harsh reality of their lives.",
        "quote": "Knowledge is the real wealth. — Education is the only weapon that can change the world.",
        "trailer": "4bqM64EJY2c",
        "tags": [
            "period",
            "social",
            "classic"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "A. Sarkunam",
        "cast": "Vimal, Iniya, K. Bhagyaraj",
        "keywords": "teacher, village, poverty, education, brick kiln",
        "cinematographer": "Om Prakash",
        "music": "M. Ghibran",
        "writer": "A. Sarkunam",
        "overview": "A young teacher goes to a remote village to educate children working in brick kilns, only to discover the harsh reality of their lives."
    },
    {
        "movie_id": 58,
        "title": "Aalavandhan",
        "genre": [
            "Action",
            "Psychological",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 81,
        "popularity_score": 0.8,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2001,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/u6C8youno9ycdYfO7DaRi01meax.jpg",
        "synopsis": "A special forces officer must stop his mentally unstable twin brother from murdering his fiancée.",
        "quote": "The mind is its own place, and in itself can make a heaven of hell, a hell of heaven. — Shadows of the past never leave.",
        "trailer": "WnPu90GEWpU",
        "tags": [
            "cult",
            "classic",
            "dark"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Suresh Krissna",
        "cast": "Kamal Haasan, Raveena Tandon, Manisha Koirala",
        "keywords": "twins, psychological, hallucination, commando, prison break",
        "cinematographer": "S. Tirru",
        "music": "Shankar-Ehsaan-Loy",
        "writer": "Kamal Haasan",
        "overview": "A special forces officer must stop his mentally unstable twin brother from murdering his fiancée."
    },
    {
        "movie_id": 59,
        "title": "Virumaandi",
        "genre": [
            "Action",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 87,
        "popularity_score": 0.85,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2004,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/w6m82voYXa6jQEEqzIBTkKRtuYB.jpg",
        "synopsis": "A non-linear narrative exploring the lives of two prisoners and the events that led to their incarceration, questioning the death penalty.",
        "quote": "An eye for an eye will make the whole world blind. — Truth is rarely pure and never simple.",
        "trailer": "RVN_g9XYUsY",
        "tags": [
            "cult",
            "classic",
            "social"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Kamal Haasan",
        "cast": "Kamal Haasan, Abhirami, Pasupathy",
        "keywords": "non-linear, village, revenge, death penalty, jallikattu",
        "cinematographer": "Keshav Prakash",
        "music": "Ilaiyaraaja",
        "writer": "Kamal Haasan",
        "overview": "A non-linear narrative exploring the lives of two prisoners and the events that led to their incarceration, questioning the death penalty."
    },
    {
        "movie_id": 60,
        "title": "Thuppakki",
        "genre": [
            "Action",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 88,
        "popularity_score": 0.95,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2012,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/18Hvx5MDIVnoexyehnGmMQE1lod.jpg",
        "synopsis": "An army captain on vacation in Mumbai intercepts a terrorist plot and sets out to dismantle the sleeper cells in the city.",
        "quote": "I am waiting! — One man's war against terror.",
        "trailer": "aW_j4pNvG98",
        "tags": [
            "blockbuster",
            "modern",
            "army"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+ Hotstar",
                "url": "https://www.hotstar.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "A. R. Murugadoss",
        "cast": "Vijay, Kajal Aggarwal, Sathyan",
        "keywords": "army, sleeper cell, mumbai, terrorism, intelligence",
        "cinematographer": "Santosh Sivan",
        "music": "Harris Jayaraj",
        "writer": "A. R. Murugadoss",
        "overview": "An army captain on vacation in Mumbai intercepts a terrorist plot and sets out to dismantle the sleeper cells in the city."
    },
    {
        "movie_id": 61,
        "title": "Aayirathil Oruvan",
        "genre": [
            "Action",
            "Adventure",
            "Fantasy"
        ],
        "experience_type": "intense",
        "rating_percent": 81,
        "popularity_score": 0.86,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 2010,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/9lrbtKE8vKIpYXxjj0hSwhnC81o.jpg",
        "synopsis": "An archaeologist, a government official, and a porter embark on a journey to find a lost Chola prince and a sacred statue.",
        "quote": "The past is never dead. It's not even past. — History is written by the survivors.",
        "trailer": "HZWlRm8vLxc",
        "tags": [
            "cult",
            "classic",
            "epic"
        ],
        "ottPlatforms": [
            {
                "name": "Sun NXT",
                "url": "https://www.sunnxt.com"
            }
        ],
        "director": "Selvaraghavan",
        "cast": "Karthi, Reema Sen, Andrea Jeremiah, Parthiban",
        "keywords": "archeology, chola, mystery, adventure, expedition",
        "cinematographer": "Ramji",
        "music": "G. V. Prakash Kumar",
        "writer": "Selvaraghavan",
        "overview": "An archaeologist, a government official, and a porter embark on a journey to find a lost Chola prince and a sacred statue."
    },
    {
        "movie_id": 62,
        "title": "Aruvi",
        "genre": [
            "Drama",
            "Social"
        ],
        "experience_type": "emotional",
        "rating_percent": 93,
        "popularity_score": 0.88,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2017,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/dqyDZ3B5R7OrTjioigQ7kqt20eH.jpg",
        "synopsis": "A young woman who has been cast out by society and her family attempts to find meaning during an existential crisis while challenging consumerist norms.",
        "quote": "Humanity is the only religion. — A drop of water that refused to be an ocean.",
        "trailer": "jgYYxs_d_bo",
        "tags": [
            "social",
            "critically-acclaimed"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Arun Prabu Purushothaman",
        "cast": "Aditi Balan, Anjali Varadhan, Lakshmi Gopalaswamy",
        "keywords": "existential, reality show, rebellion, consumerism, social satire",
        "cinematographer": "Shelley Calist",
        "music": "Bindhumalini, Vedanth Bharadwaj",
        "writer": "Arun Prabu Purushothaman",
        "overview": "A young woman who has been cast out by society and her family attempts to find meaning during an existential crisis while challenging consumerist norms."
    },
    {
        "movie_id": 63,
        "title": "Kaithi",
        "genre": [
            "Action",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 85,
        "popularity_score": 0.94,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com/title/81232014",
        "prime_url": "",
        "year": 2019,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/mxvOvom5zKRp4WPURKrhjoatt4P.jpg",
        "synopsis": "An ex-convict on his way to meet his daughter for the first time is intercepted by a police officer to help save dozens of poisoned cops.",
        "quote": "I am not doing this for you. I am doing this for my daughter. — One night, one man, and a whole lot of courage.",
        "trailer": "g79CvhHaj5I",
        "tags": [
            "modern",
            "action",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/81232014"
            }
        ],
        "director": "Lokesh Kanagaraj",
        "cast": "Karthi, Narain, Arjun Das",
        "keywords": "prison, police, drugs, father-daughter, night, lcu",
        "cinematographer": "Sathyan Sooryan",
        "music": "Sam C. S.",
        "writer": "Lokesh Kanagaraj",
        "overview": "An ex-convict on his way to meet his daughter for the first time is intercepted by a police officer to help save dozens of poisoned cops."
    },
    {
        "movie_id": 64,
        "title": "Theeran Adhigaaram Ondru",
        "genre": [
            "Action",
            "Crime",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 82,
        "popularity_score": 0.89,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2017,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ocRAXgjqCO8n4sVNxjKLqr1waMy.jpg",
        "synopsis": "Based on true events, an honest police officer investigates a series of brutal dacoity-murders and tracks down the gang responsible.",
        "quote": "The law is equal for everyone. — Justice is not a destination, it's a journey.",
        "trailer": "t3a4gmUfi1c",
        "tags": [
            "realistic",
            "crime",
            "action"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "H. Vinoth",
        "cast": "Karthi, Rakul Preet Singh, Abhimanyu Singh",
        "keywords": "police, investigation, true story, dacoits, thriller",
        "cinematographer": "Sathyan Sooryan",
        "music": "Ghibran",
        "writer": "H. Vinoth",
        "overview": "Based on true events, an honest police officer investigates a series of brutal dacoity-murders and tracks down the gang responsible."
    },
    {
        "movie_id": 65,
        "title": "Soorarai Pottru",
        "genre": [
            "Action",
            "Drama",
            "Biopic"
        ],
        "experience_type": "emotional",
        "rating_percent": 91,
        "popularity_score": 0.96,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B08L79L7Q6",
        "year": 2020,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/5uimlxPCgAei8JfQUDFEUQLoyyh.jpg",
        "synopsis": "The story of Maara, a young man from a remote village, who dreams of launching a low-cost airline and challenges the monopoly of the aviation industry.",
        "quote": "If you have a dream, protect it. — Sky is the limit when you have wings of fire.",
        "trailer": "fa_DIwRsa9o",
        "tags": [
            "biopic",
            "inspirational",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B08L79L7Q6"
            }
        ],
        "director": "Sudha Kongara",
        "cast": "Suriya, Aparna Balamurali, Paresh Rawal",
        "keywords": "aviation, airline, entrepreneur, dream, struggle, g.r. gopinath",
        "cinematographer": "Niketh Bommireddy",
        "music": "G. V. Prakash Kumar",
        "writer": "Sudha Kongara",
        "overview": "The story of Maara, a young man from a remote village, who dreams of launching a low-cost airline and challenges the monopoly of the aviation industry."
    },
    {
        "movie_id": 66,
        "title": "Jai Bhim",
        "genre": [
            "Crime",
            "Drama",
            "Legal"
        ],
        "experience_type": "emotional",
        "rating_percent": 93,
        "popularity_score": 0.97,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B09K8Y6W9Z",
        "year": 2021,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ehybiOtBUtrMkmtB39zQEtq1Jie.jpg",
        "synopsis": "A brave lawyer fights for the rights of a tribal woman whose husband has been wrongly accused and killed in police custody.",
        "quote": "Law is not just for the powerful. — A voice for the voiceless.",
        "trailer": "Gc6dEDnL8JA",
        "tags": [
            "justice",
            "social",
            "powerful"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B09K8Y6W9Z"
            }
        ],
        "director": "T. J. Gnanavel",
        "cast": "Suriya, Lijomol Jose, Manikandan",
        "keywords": "human rights, legal, tribal, police brutality, justice",
        "cinematographer": "S. R. Kathir",
        "music": "Sean Roldan",
        "writer": "T. J. Gnanavel",
        "overview": "A brave lawyer fights for the rights of a tribal woman whose husband has been wrongly accused and killed in police custody."
    },
    {
        "movie_id": 67,
        "title": "Karnan",
        "genre": [
            "Action",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 88,
        "popularity_score": 0.9,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2021,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/z5SxDcVWa9nokynVqBHb2IKk78J.jpg",
        "synopsis": "A young man fights for the rights and dignity of his marginalized village when they are mistreated by the police and local authorities.",
        "quote": "Dignity is our right. — Resistance is an act of love for one's people.",
        "trailer": "pgfUzQ8nzBY",
        "tags": [
            "social",
            "action",
            "modern"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Mari Selvaraj",
        "cast": "Dhanush, Rajisha Vijayan, Lal",
        "keywords": "caste, resistance, village, justice, police brutality",
        "cinematographer": "Theni Eswar",
        "music": "Santhosh Narayanan",
        "writer": "Mari Selvaraj",
        "overview": "A young man fights for the rights and dignity of his marginalized village when they are mistreated by the police and local authorities."
    },
    {
        "movie_id": 68,
        "title": "Madras",
        "genre": [
            "Action",
            "Drama",
            "Political"
        ],
        "experience_type": "intense",
        "rating_percent": 84,
        "popularity_score": 0.85,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 2014,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/hbaUw4NzU7Zd6QGj7HMNohfWpIT.jpg",
        "synopsis": "A political rivalry between two factions in North Chennai centers around a disputed wall in a local housing colony.",
        "quote": "The walls we build are part of the history we write. — Politics is in everything.",
        "trailer": "-SzlsRBPPCg",
        "tags": [
            "political",
            "urban",
            "realistic"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+ Hotstar",
                "url": "https://www.hotstar.com"
            }
        ],
        "director": "Pa. Ranjith",
        "cast": "Karthi, Catherine Tresa, Kalaiyarasan",
        "keywords": "north chennai, politics, wall, rivalry, urban life",
        "cinematographer": "G. Murali",
        "music": "Santhosh Narayanan",
        "writer": "Pa. Ranjith",
        "overview": "A political rivalry between two factions in North Chennai centers around a disputed wall in a local housing colony."
    },
    {
        "movie_id": 69,
        "title": "Kadaisi Vivasayi",
        "genre": [
            "Drama"
        ],
        "experience_type": "emotional",
        "rating_percent": 89,
        "popularity_score": 0.8,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 2022,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8TNnEojAEc8Kt6HMWgQNRPcL9J3.jpg",
        "synopsis": "An elderly farmer in a remote village remains the only one committed to agriculture as the rest of the community moves towards modernization.",
        "quote": "Feeding the world is the most sacred work. — Nature never fails those who follow her.",
        "trailer": "cGorkMwcjd4",
        "tags": [
            "social",
            "meaningful",
            "artistic"
        ],
        "ottPlatforms": [
            {
                "name": "SonyLIV",
                "url": "https://www.sonyliv.com"
            }
        ],
        "director": "M. Manikandan",
        "cast": "Nallandi, Vijay Sethupathi, Yogi Babu",
        "keywords": "agriculture, farmer, village, tradition, modernization",
        "cinematographer": "M. Manikandan",
        "music": "Santhosh Narayanan, Richard Harvey",
        "writer": "M. Manikandan",
        "overview": "An elderly farmer in a remote village remains the only one committed to agriculture as the rest of the community moves towards modernization."
    },
    {
        "movie_id": 70,
        "title": "Merku Thodarchi Malai",
        "genre": [
            "Drama"
        ],
        "experience_type": "emotional",
        "rating_percent": 87,
        "popularity_score": 0.72,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 2018,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ffokxb2e6CpdZxCDXKwLU7FGfKl.jpg",
        "synopsis": "The film explores the lives of landless laborers living on the foothills of the Western Ghats and their struggle for land ownership.",
        "quote": "The mountains watch over the humble. — Land is not a property; it's a way of life.",
        "trailer": "DGbchTBSkV4",
        "tags": [
            "rural",
            "artistic",
            "underrated"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com"
            }
        ],
        "director": "Lenin Bharathi",
        "cast": "Antony, Gayathri Krishna, Abu Valayakulam",
        "keywords": "western ghats, labor, rural life, land struggle, documentary-style",
        "cinematographer": "Theni Eswar",
        "music": "Ilaiyaraaja",
        "writer": "Lenin Bharathi",
        "overview": "The film explores the lives of landless laborers living on the foothills of the Western Ghats and their struggle for land ownership."
    },
    {
        "movie_id": 71,
        "title": "7G Rainbow Colony",
        "genre": [
            "Drama",
            "Romance"
        ],
        "experience_type": "emotional",
        "rating_percent": 84,
        "popularity_score": 0.88,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2004,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/87qT4iZ3ksBBsiKdqHUJEtZcnum.jpg",
        "synopsis": "A young man from a middle-class background falls head over heels for a girl who moves into his colony, leading to a journey of self-discovery.",
        "quote": "Love changes us in ways we never expected. — Real love is about growing together.",
        "trailer": "U2J8x_Dq18Y",
        "tags": [
            "cult",
            "classic",
            "romance"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Selvaraghavan",
        "cast": "Ravi Krishna, Sonia Agarwal, Suman Setty",
        "keywords": "middle class, colony, intense love, transformation",
        "cinematographer": "Aravind Krishna",
        "music": "Yuvan Shankar Raja",
        "writer": "Selvaraghavan",
        "overview": "A young man from a middle-class background falls head over heels for a girl who moves into his colony, leading to a journey of self-discovery."
    },
    {
        "movie_id": 72,
        "title": "Pudhupettai",
        "genre": [
            "Action",
            "Crime",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 88,
        "popularity_score": 0.9,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2006,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/tDHgRk7Q0YjpXennMPUXpZrB1gQ.jpg",
        "synopsis": "A young man escapes from his abusive home and rises to become a powerful gangster in North Chennai.",
        "quote": "In the world of power, there are no friends. — Survival of the fittest is the only law.",
        "trailer": "KwU1yCeHrkQ",
        "tags": [
            "cult",
            "classic",
            "gangster"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Selvaraghavan",
        "cast": "Dhanush, Sneha, Sonia Agarwal",
        "keywords": "gangster, north chennai, politics, rise and fall, gritty",
        "cinematographer": "Arvind Krishna",
        "music": "Yuvan Shankar Raja",
        "writer": "Selvaraghavan",
        "overview": "A young man escapes from his abusive home and rises to become a powerful gangster in North Chennai."
    },
    {
        "movie_id": 73,
        "title": "Super Deluxe",
        "genre": [
            "Crime",
            "Drama",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 89,
        "popularity_score": 0.92,
        "age_limit": 18,
        "netflix_url": "https://www.netflix.com/title/81087532",
        "prime_url": "",
        "year": 2019,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/rTsYDdFWyw87CTk4YgJO6nYmVcJ.jpg",
        "synopsis": "Four independent stories converge as their characters find themselves in extraordinary situations and moral dilemmas.",
        "quote": "Life is a series of unexpected encounters. — Everything is connected in this beautiful mess.",
        "trailer": "3-Xq_Zz3nPA",
        "tags": [
            "cult",
            "modern",
            "experimental"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/81087532"
            }
        ],
        "director": "Thiagarajan Kumararaja",
        "cast": "Vijay Sethupathi, Fahadh Faasil, Samantha, Ramya Krishnan",
        "keywords": "transgender, infidelity, religion, science fiction, hyperlink cinema",
        "cinematographer": "P. S. Vinod, Nirav Shah",
        "music": "Yuvan Shankar Raja",
        "writer": "Thiagarajan Kumararaja",
        "overview": "Four independent stories converge as their characters find themselves in extraordinary situations and moral dilemmas."
    },
    {
        "movie_id": 74,
        "title": "Hey Ram",
        "genre": [
            "Crime",
            "Drama",
            "Historical"
        ],
        "experience_type": "intense",
        "rating_percent": 85,
        "popularity_score": 0.85,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2000,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/hHaq5QffND0x8dXEqjVPAmFlJv6.jpg",
        "synopsis": "A man's life is changed forever during the partition of India, leading him on a path of revenge and redemption.",
        "quote": "Hate is a heavy burden. — Seeking truth in a time of chaos.",
        "trailer": "GKLvKk_uXzA",
        "tags": [
            "classic",
            "historical",
            "political"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Kamal Haasan",
        "cast": "Kamal Haasan, Shah Rukh Khan, Rani Mukerji",
        "keywords": "partition, gandhi, revenge, history, redemption",
        "cinematographer": "Tirru",
        "music": "Ilaiyaraaja",
        "writer": "Kamal Haasan",
        "overview": "A man's life is changed forever during the partition of India, leading him on a path of revenge and redemption."
    },
    {
        "movie_id": 75,
        "title": "Dasavathaaram",
        "genre": [
            "Action",
            "Sci-Fi",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 72,
        "popularity_score": 0.9,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 2008,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/iD6ilUABEPd1hbijxdWCYHSetoi.jpg",
        "synopsis": "A scientist must prevent a deadly bio-weapon from falling into the wrong hands while being pursued across India and the US.",
        "quote": "Everything happens for a reason. — Ten souls, one destiny.",
        "trailer": "MAnKUX9w494",
        "tags": [
            "ambitious",
            "hit",
            "spectacle"
        ],
        "ottPlatforms": [
            {
                "name": "Sun NXT",
                "url": "https://www.sunnxt.com"
            }
        ],
        "director": "K. S. Ravikumar",
        "cast": "Kamal Haasan, Asin, Mallika Sherawat",
        "keywords": "bio-weapon, 10 roles, tsunami, science fiction, conspiracy",
        "cinematographer": "Ravi Varman",
        "music": "Himesh Reshammiya",
        "writer": "Kamal Haasan",
        "overview": "A scientist must prevent a deadly bio-weapon from falling into the wrong hands while being pursued across India and the US."
    },
    {
        "movie_id": 76,
        "title": "Ghilli",
        "genre": [
            "Action",
            "Sports",
            "Romance"
        ],
        "experience_type": "fun",
        "rating_percent": 88,
        "popularity_score": 0.95,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 2004,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/aUvUohnBgX5sbuMKNyKDAPAoVNc.jpg",
        "synopsis": "A state-level kabaddi player rescues a girl from a powerful politician's clutches and takes her to Chennai to protect her.",
        "quote": "Vidu vidu! — Love is a game we play for real.",
        "trailer": "EtJXEmW_XNM",
        "tags": [
            "blockbuster",
            "classic",
            "sports"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+ Hotstar",
                "url": "https://www.hotstar.com"
            }
        ],
        "director": "Dharani",
        "cast": "Vijay, Trisha, Prakash Raj",
        "keywords": "kabaddi, rescue, politician, rivalry, madness",
        "cinematographer": "Gopinath",
        "music": "Vidyasagar",
        "writer": "Dharani",
        "overview": "A state-level kabaddi player rescues a girl from a powerful politician's clutches and takes her to Chennai to protect her."
    },
    {
        "movie_id": 77,
        "title": "Maanadu",
        "genre": [
            "Action",
            "Sci-Fi",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 86,
        "popularity_score": 0.93,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 2021,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/zO4mfRXYwuOYSy4YoXGVxh3oz1p.jpg",
        "synopsis": "A man trapped in a time loop must stop a political assassination and prevent a communal riot.",
        "quote": "Time is an illusion, but every second counts. — Loop until you win.",
        "trailer": "3FuuZU21S80",
        "tags": [
            "time-loop",
            "modern",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "SonyLIV",
                "url": "https://www.sonyliv.com"
            }
        ],
        "director": "Venkat Prabhu",
        "cast": "Silambarasan, S. J. Suryah, Kalyani Priyadarshan",
        "keywords": "time loop, political conspiracy, assassination, thriller, recurrence",
        "cinematographer": "Richard M. Nathan",
        "music": "Yuvan Shankar Raja",
        "writer": "Venkat Prabhu",
        "overview": "A man trapped in a time loop must stop a political assassination and prevent a communal riot."
    },
    {
        "movie_id": 78,
        "title": "Padayappa",
        "genre": [
            "Action",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 90,
        "popularity_score": 0.98,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 1999,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/8PSYF0AtpLbSlTDneCUo7zP4qL1.jpg",
        "synopsis": "The son of an engineer must reclaim his family's honor and property after they are betrayed by his uncle.",
        "quote": "En Vazhi Thani Vazhi! — Pride goes before a fall, but honor stands tall.",
        "trailer": "8U9t5xMElN0",
        "tags": [
            "classic",
            "blockbuster",
            "mass"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "K. S. Ravikumar",
        "cast": "Rajinikanth, Ramya Krishnan, Shivaji Ganesan",
        "keywords": "vengeance, family honor, betrayal, mass hero, iconic villain",
        "cinematographer": "Saroja Devi",
        "music": "A. R. Rahman",
        "writer": "K. S. Ravikumar",
        "overview": "The son of an engineer must reclaim his family's honor and property after they are betrayed by his uncle."
    },
    {
        "movie_id": 79,
        "title": "Baashha",
        "genre": [
            "Action",
            "Crime",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 92,
        "popularity_score": 0.99,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 1995,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/pxAfmnO8BZsTapQo0Pxd0ZpxuIh.jpg",
        "synopsis": "A humble auto-driver hides a violent past as a Bombay underworld don to protect his brothers and sisters.",
        "quote": "Naan Oru Thadava Sonna, Nooru Thadava Sonna Madhiri! — A man's silence is louder than an ocean's roar.",
        "trailer": "1g-yZ3BDDK0",
        "tags": [
            "classic",
            "cult",
            "mass"
        ],
        "ottPlatforms": [
            {
                "name": "Amazon Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "Suresh Krissna",
        "cast": "Rajinikanth, Nagma, Raghuvaran",
        "keywords": "underworld, Mumbai, auto driver, secret identity, brotherhood",
        "cinematographer": "P. S. Prakash",
        "music": "Deva",
        "writer": "Suresh Krissna",
        "overview": "A humble auto-driver hides a violent past as a Bombay underworld don to protect his brothers and sisters."
    },
    {
        "movie_id": 80,
        "title": "Anniyan",
        "genre": [
            "Action",
            "Crime",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 88,
        "popularity_score": 0.94,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com",
        "year": 2005,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/9yvvHfswmlMcuivXe6gRu6uTzhu.jpg",
        "synopsis": "An idealistic lawyer suffering from multiple personality disorder becomes a vigilante to punish corrupt individuals according to Garuda Purana.",
        "quote": "If you don't follow the rules, the rules will follow you. — Justice served raw.",
        "trailer": "mwNKLgTJCg0",
        "tags": [
            "vigilante",
            "classic",
            "psychological"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com"
            }
        ],
        "director": "S. Shankar",
        "cast": "Vikram, Sadha, Prakash Raj",
        "keywords": "multiple personality, vigilante, corruption, garuda purana, split personality",
        "cinematographer": "Ravi Varman, V. Manikandan",
        "music": "Harris Jayaraj",
        "writer": "S. Shankar",
        "overview": "An idealistic lawyer suffering from multiple personality disorder becomes a vigilante to punish corrupt individuals according to Garuda Purana."
    },
    {
        "movie_id": 81,
        "title": "96",
        "genre": [
            "Drama",
            "Romance"
        ],
        "experience_type": "emotional",
        "rating_percent": 91,
        "popularity_score": 0.94,
        "age_limit": 0,
        "netflix_url": "",
        "prime_url": "",
        "year": 2018,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/nrVloCa2hCFOztRF1DZU2jnWIiQ.jpg",
        "synopsis": "Two high school sweethearts meet again at a reunion after 22 years and reminisce about their past and unspoken feelings.",
        "quote": "Memories are the only things that don't change. — Reconnecting with the heart of who you were.",
        "trailer": "r0synl-lI4I",
        "tags": [
            "modern-classic",
            "romance",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Sun NXT",
                "url": "https://www.sunnxt.com"
            }
        ],
        "director": "C. Premkumar",
        "cast": "Vijay Sethupathi, Trisha Krishnan",
        "keywords": "reunion, school sweethearts, nostalgia, romance, unspoken love",
        "cinematographer": "N. Shanmuga Sundaram",
        "music": "Govind Vasantha",
        "writer": "C. Premkumar",
        "overview": "Two high school sweethearts meet again at a reunion after 22 years and reminisce about their past and unspoken feelings."
    },
    {
        "movie_id": 82,
        "title": "Aranmanai 4",
        "genre": [
            "Comedy",
            "Horror"
        ],
        "experience_type": "fun",
        "rating_percent": 65,
        "popularity_score": 0.85,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 2024,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/oLyhRYPGhg4lv7HXXQA2aZJcLHd.jpg",
        "synopsis": "The fourth installment in the horror-comedy franchise, where a family faces a new supernatural threat in an ancestral palace.",
        "quote": "Fear has a new face. — When the shadows come alive, laugh your way out.",
        "trailer": "Keck4iVUUdE",
        "tags": [
            "modern",
            "horror-comedy"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+ Hotstar",
                "url": "https://www.hotstar.com"
            }
        ],
        "director": "Sundar C",
        "cast": "Sundar C, Tamannaah Bhatia, Raashii Khanna",
        "keywords": "ghost, mansion, palace, family tragedy, supernatural",
        "cinematographer": "E. Krishnasamy",
        "music": "Hiphop Tamizha",
        "writer": "Sundar C",
        "overview": "The fourth installment in the horror-comedy franchise, where a family faces a new supernatural threat in an ancestral palace."
    },
    {
        "movie_id": 83,
        "title": "Irugapatru",
        "genre": [
            "Drama",
            "Romance"
        ],
        "experience_type": "emotional",
        "rating_percent": 84,
        "popularity_score": 0.82,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com/title/81643112",
        "prime_url": "",
        "year": 2023,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/omhjI4gA06ZKQ6lr8uGC9zG91dl.jpg",
        "synopsis": "A marriage counselor navigates the complexities of her own marriage while helping three other couples resolve their issues.",
        "quote": "Marriage is a bridge between two souls. — Understanding is the foundation of love.",
        "trailer": "x82MBPDCOmU",
        "tags": [
            "modern",
            "relationship",
            "urban"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/81643112"
            }
        ],
        "director": "Yuvaraj Dhayalan",
        "cast": "Vikram Prabhu, Shraddha Srinath, Vidaarth",
        "keywords": "marriage counseling, relationships, urban life, complications, love",
        "cinematographer": "Gokul Benoy",
        "music": "Justin Prabhakaran",
        "writer": "Yuvaraj Dhayalan",
        "overview": "A marriage counselor navigates the complexities of her own marriage while helping three other couples resolve their issues."
    },
    {
        "movie_id": 84,
        "title": "Minnal Murali",
        "genre": [
            "Action",
            "Adventure",
            "Sci-Fi"
        ],
        "experience_type": "fun",
        "rating_percent": 87,
        "popularity_score": 0.9,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com/title/81414844",
        "prime_url": "",
        "year": 2021,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/5jHnykugFB3awLTwDM5LQ93TIzs.jpg",
        "synopsis": "A local tailor gains superpowers after being struck by lightning and becomes a protector of his village from a dark force.",
        "quote": "A hero is born in a flash. — Power comes with responsibility, and heart.",
        "trailer": "zAUAliz1TKA",
        "tags": [
            "superhero",
            "modern",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/81414844"
            }
        ],
        "director": "Basil Joseph",
        "cast": "Tovino Thomas, Guru Somasundaram, Aju Varghese",
        "keywords": "superhero, lightning, small town, protector, rivalry",
        "cinematographer": "Sameer Thahir",
        "music": "Sushin Shyam",
        "writer": "Arun Anirudhan, Justin Mathew",
        "overview": "A local tailor gains superpowers after being struck by lightning and becomes a protector of his village from a dark force."
    },
    {
        "movie_id": 85,
        "title": "Leo",
        "genre": [
            "Action",
            "Crime",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 82,
        "popularity_score": 0.98,
        "age_limit": 18,
        "netflix_url": "https://www.netflix.com/title/81721676",
        "prime_url": "",
        "year": 2023,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/t1oAdt8JjUs4sHEBvE8fKtjV7er.jpg",
        "synopsis": "A mild-mannered cafe owner becomes a local hero through an act of violence, but his past catches up with him as dangerous gangsters suspect him of being one of their own.",
        "quote": "Bloody Sweet! — The past is a predator that never stops hunting.",
        "trailer": "Po3jStA673E",
        "tags": [
            "blockbuster",
            "modern",
            "action"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/81721676"
            }
        ],
        "director": "Lokesh Kanagaraj",
        "cast": "Vijay, Sanjay Dutt, Arjun Sarja",
        "keywords": "secret identity, cafe owner, lcu, gangster, family",
        "cinematographer": "Manoj Paramahamsa",
        "music": "Anirudh Ravichander",
        "writer": "Lokesh Kanagaraj",
        "overview": "A mild-mannered cafe owner becomes a local hero through an act of violence, but his past catches up with him as dangerous gangsters suspect him of being one of their own."
    },
    {
        "movie_id": 86,
        "title": "Master",
        "genre": [
            "Action",
            "Crime",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 81,
        "popularity_score": 0.95,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com/title/81403061",
        "prime_url": "https://www.amazon.com/dp/B08SYK6557",
        "year": 2021,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/wjbOlovDadOdPKkSAMohLCjbIsc.jpg",
        "synopsis": "An alcoholic professor is sent to a juvenile correctional facility, where he clashing with a ruthless gangster who uses the children for criminal activities.",
        "quote": "Vaathi Coming! — A teacher's real test is outside the classroom.",
        "trailer": "UTiXQcrLlv4",
        "tags": [
            "blockbuster",
            "mass",
            "modern"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B08SYK6557"
            },
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/81403061"
            }
        ],
        "director": "Lokesh Kanagaraj",
        "cast": "Vijay, Vijay Sethupathi, Malavika Mohanan",
        "keywords": "professor, juvenile home, addiction, reform, showdown",
        "cinematographer": "Sathyan Sooryan",
        "music": "Anirudh Ravichander",
        "writer": "Lokesh Kanagaraj",
        "overview": "An alcoholic professor is sent to a juvenile correctional facility, where he clashing with a ruthless gangster who uses the children for criminal activities."
    },
    {
        "movie_id": 87,
        "title": "Vikram",
        "genre": [
            "Action",
            "Crime",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 89,
        "popularity_score": 0.97,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B0B5F9Z9Y9",
        "year": 2022,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/ayBcfq7djGJvMFgcfot8Ybu9j5x.jpg",
        "synopsis": "A special agent investigates a series of murders and uncovers a massive drug cartel, leading to a confrontation with a powerful warlord.",
        "quote": "Once a lion, always a lion. — The hunt is on, and the predator is back.",
        "trailer": "OKBMCL-frPU",
        "tags": [
            "blockbuster",
            "lcu",
            "modern"
        ],
        "ottPlatforms": [
            {
                "name": "Disney+ Hotstar",
                "url": "https://www.hotstar.com"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B0B5F9Z9Y9"
            }
        ],
        "director": "Lokesh Kanagaraj",
        "cast": "Kamal Haasan, Vijay Sethupathi, Fahadh Faasil",
        "keywords": "special agent, cartel, drug war, lcu, mask",
        "cinematographer": "Girish Gangadharan",
        "music": "Anirudh Ravichander",
        "writer": "Lokesh Kanagaraj",
        "overview": "A special agent investigates a series of murders and uncovers a massive drug cartel, leading to a confrontation with a powerful warlord."
    },
    {
        "movie_id": 88,
        "title": "Jailer",
        "genre": [
            "Action",
            "Crime",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 85,
        "popularity_score": 0.99,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B0C8V9Y9Y9",
        "year": 2023,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/pTmMxAHqX4vsIDE6HPPxOR0Q6TN.jpg",
        "synopsis": "A retired jailer goes on a hunt for his missing son and uncovers a dangerous artifact smuggling ring.",
        "quote": "Hukum! — Experience is the greatest weapon.",
        "trailer": "Y5BeWdODPqo",
        "tags": [
            "blockbuster",
            "mass",
            "modern"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B0C8V9Y9Y9"
            }
        ],
        "director": "Nelson Dilipkumar",
        "cast": "Rajinikanth, Vinayakan, Ramya Krishnan",
        "keywords": "jailer, smuggling, vengeance, family, mass",
        "cinematographer": "Vijay Kartik Kannan",
        "music": "Anirudh Ravichander",
        "writer": "Nelson Dilipkumar",
        "overview": "A retired jailer goes on a hunt for his missing son and uncovers a dangerous artifact smuggling ring."
    },
    {
        "movie_id": 89,
        "title": "Ponniyin Selvan: I",
        "genre": [
            "Action",
            "Drama",
            "History"
        ],
        "experience_type": "intense",
        "rating_percent": 84,
        "popularity_score": 0.9,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B0BHKV9Y9Y",
        "year": 2022,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/zSNyZUeqDdii0doQ9970E90kCkb.jpg",
        "synopsis": "The Chola empire is under threat from internal and external forces as a secret conspiracy brews to overthrow the king.",
        "quote": "The empire is within us. — Every sword has a story, every crown a burden.",
        "trailer": "D4qAQYlgZQs",
        "tags": [
            "epic",
            "historical",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B0BHKV9Y9Y"
            }
        ],
        "director": "Mani Ratnam",
        "cast": "Vikram, Aishwarya Rai Bachchan, Jayam Ravi",
        "keywords": "chola, empire, conspiracy, throne, history",
        "cinematographer": "Ravi Varman",
        "music": "A. R. Rahman",
        "writer": "Mani Ratnam",
        "overview": "The Chola empire is under threat from internal and external forces as a secret conspiracy brews to overthrow the king."
    },
    {
        "movie_id": 90,
        "title": "Ponniyin Selvan: II",
        "genre": [
            "Action",
            "Drama",
            "History"
        ],
        "experience_type": "intense",
        "rating_percent": 86,
        "popularity_score": 0.92,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B0C5V9Y9Y9",
        "year": 2023,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/nOL9tAttLhJUqQ9UI0iKKVaKXJY.jpg",
        "synopsis": "The continuation of the epic saga where the Chola princes must unite to defend their empire and reclaim their legacy.",
        "quote": "Legacies are born in fire. — The truth of the Cholas revealed.",
        "trailer": "EnhS3matIoU",
        "tags": [
            "epic",
            "historical",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B0C5V9Y9Y9"
            }
        ],
        "director": "Mani Ratnam",
        "cast": "Vikram, Aishwarya Rai Bachchan, Jayam Ravi",
        "keywords": "chola, empire, legacy, battle, coronation",
        "cinematographer": "Ravi Varman",
        "music": "A. R. Rahman",
        "writer": "Mani Ratnam",
        "overview": "The continuation of the epic saga where the Chola princes must unite to defend their empire and reclaim their legacy."
    },
    {
        "movie_id": 91,
        "title": "Mankatha",
        "genre": [
            "Action",
            "Crime",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 84,
        "popularity_score": 0.9,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 2011,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/tZnDKJyUYfZKKPfBgVheU9vKlUo.jpg",
        "synopsis": "A suspended police officer joins forces with a group of youngsters to steal a massive amount of betting money during the IPL.",
        "quote": "Money is the only language everyone understands. — No discipline, only game.",
        "trailer": "vHESM8iR1JE",
        "tags": [
            "heist",
            "cult",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Sun NXT",
                "url": "https://www.sunnxt.com"
            }
        ],
        "director": "Venkat Prabhu",
        "cast": "Ajith Kumar, Arjun Sarja, Trisha Krishnan",
        "keywords": "heist, gambling, cricket, ipl, betrayal",
        "cinematographer": "Sakthi Saravanan",
        "music": "Yuvan Shankar Raja",
        "writer": "Venkat Prabhu",
        "overview": "A suspended police officer joins forces with a group of youngsters to steal a massive amount of betting money during the IPL."
    },
    {
        "movie_id": 92,
        "title": "Petta",
        "genre": [
            "Action",
            "Drama"
        ],
        "experience_type": "fun",
        "rating_percent": 80,
        "popularity_score": 0.94,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com/title/81043132",
        "prime_url": "",
        "year": 2019,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/icrS7HzjT9DsionJLSnYFfjR9rW.jpg",
        "synopsis": "A hostel warden with a mysterious past takes on a dangerous politician and his son to protect his friends.",
        "quote": "Get Rajinified! — Style is a way of saying who you are without having to speak.",
        "trailer": "FCB0ZfQ9Rzs",
        "tags": [
            "mass",
            "blockbuster",
            "style"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/81043132"
            }
        ],
        "director": "Karthik Subbaraj",
        "cast": "Rajinikanth, Vijay Sethupathi, Nawazuddin Siddiqui",
        "keywords": "hostel, politician, revenge, style, mass",
        "cinematographer": "Tirru",
        "music": "Anirudh Ravichander",
        "writer": "Karthik Subbaraj",
        "overview": "A hostel warden with a mysterious past takes on a dangerous politician and his son to protect his friends."
    },
    {
        "movie_id": 93,
        "title": "Viswasam",
        "genre": [
            "Action",
            "Drama"
        ],
        "experience_type": "emotional",
        "rating_percent": 75,
        "popularity_score": 0.92,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B07N8V9Y9Y",
        "year": 2019,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/9XXABbZY62OWkkjUDPVysMTs7fc.jpg",
        "synopsis": "A village chieftain attempts to mend his relationship with his estranged wife and protect his daughter from a powerful businessman.",
        "quote": "Family is everything. — A father's love knows no boundaries.",
        "trailer": "TiDyv53adt0",
        "tags": [
            "family",
            "mass",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B07N8V9Y9Y"
            }
        ],
        "director": "Siva",
        "cast": "Ajith Kumar, Nayanthara, Jagapathi Babu",
        "keywords": "family, loyalty, father-daughter, rural, action",
        "cinematographer": "Vetri",
        "music": "D. Imman",
        "writer": "Siva",
        "overview": "A village chieftain attempts to mend his relationship with his estranged wife and protect his daughter from a powerful businessman."
    },
    {
        "movie_id": 94,
        "title": "Kaththi",
        "genre": [
            "Action",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 88,
        "popularity_score": 0.96,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com/title/80119853",
        "prime_url": "",
        "year": 2014,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/3Zp3VCEzDJGHwvMT7pXkPj2vuYm.jpg",
        "synopsis": "A petty thief escapes from prison and ends up leading a rebellion of farmers against a crooked corporate entity.",
        "quote": "If we don't fight for our land, who will? — One man's identity, many people's hope.",
        "trailer": "bMf0IyzyKt4",
        "tags": [
            "social",
            "blockbuster",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/80119853"
            }
        ],
        "director": "A. R. Murugadoss",
        "cast": "Vijay, Samantha Ruth Prabhu, Neil Nitin Mukesh",
        "keywords": "farmers, corporate greed, dual role, social message, rebellion",
        "cinematographer": "George C. Williams",
        "music": "Anirudh Ravichander",
        "writer": "A. R. Murugadoss",
        "overview": "A petty thief escapes from prison and ends up leading a rebellion of farmers against a crooked corporate entity."
    },
    {
        "movie_id": 95,
        "title": "Asuran",
        "genre": [
            "Action",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 90,
        "popularity_score": 0.94,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B07Y7V9Y9Y",
        "year": 2019,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/Elnp3XrAlMM30dil8rbL7D9XeP.jpg",
        "synopsis": "A farmer from an underprivileged background is forced to protect his family and land from the wrath of a powerful landlord.",
        "quote": "Knowledge is the only thing they can't take away from you. — Blood for blood, land for land.",
        "trailer": "vOCM9wztBYQ",
        "tags": [
            "social",
            "critically-acclaimed",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B07Y7V9Y9Y"
            }
        ],
        "director": "Vetrimaaran",
        "cast": "Dhanush, Manju Warrier, Prakash Raj",
        "keywords": "caste, land struggle, revenge, family, survival",
        "cinematographer": "Velraj",
        "music": "G. V. Prakash Kumar",
        "writer": "Vetrimaaran",
        "overview": "A farmer from an underprivileged background is forced to protect his family and land from the wrath of a powerful landlord."
    },
    {
        "movie_id": 96,
        "title": "Vada Chennai",
        "genre": [
            "Action",
            "Crime",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 89,
        "popularity_score": 0.93,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B07J8V9Y9Y",
        "year": 2018,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4Pa7SriYtq4BdoS2BAPm6w66vLi.jpg",
        "synopsis": "A skilled carrom player becomes embroiled in a brutal gang war in North Chennai and eventually stands up for his community.",
        "quote": "Wait for the right time to strike. — North Chennai is not just a place, it's a battleground.",
        "trailer": "q5GG5HJ1hVk",
        "tags": [
            "cult",
            "gangster",
            "epic"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B07J8V9Y9Y"
            }
        ],
        "director": "Vetrimaaran",
        "cast": "Dhanush, Andrea Jeremiah, Samuthirakani",
        "keywords": "gangster, north chennai, carrom, politics, rivalry",
        "cinematographer": "Velraj",
        "music": "Santhosh Narayanan",
        "writer": "Vetrimaaran",
        "overview": "A skilled carrom player becomes embroiled in a brutal gang war in North Chennai and eventually stands up for his community."
    },
    {
        "movie_id": 97,
        "title": "Vinnaithaandi Varuvaayaa",
        "genre": [
            "Drama",
            "Romance"
        ],
        "experience_type": "emotional",
        "rating_percent": 86,
        "popularity_score": 0.9,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 2010,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/2U5bQKq9eH7ugmnxiUZy4hd7N7q.jpg",
        "synopsis": "The story of a complicated romance between a Hindu aspiring filmmaker and a Syrian Christian girl from a conservative family.",
        "quote": "Love is not about possession, it's about appreciation. — Every heartbeat tells a story of you.",
        "trailer": "9z-NeZyiyF8",
        "tags": [
            "classic",
            "romance",
            "musical"
        ],
        "ottPlatforms": [
            {
                "name": "Sun NXT",
                "url": "https://www.sunnxt.com"
            }
        ],
        "director": "Gautham Vasudev Menon",
        "cast": "Silambarasan, Trisha Krishnan",
        "keywords": "romance, filmmaker, cross-culture, heartbreak, soulmates",
        "cinematographer": "Manoj Paramahamsa",
        "music": "A. R. Rahman",
        "writer": "Gautham Vasudev Menon",
        "overview": "The story of a complicated romance between a Hindu aspiring filmmaker and a Syrian Christian girl from a conservative family."
    },
    {
        "movie_id": 98,
        "title": "Indian",
        "genre": [
            "Action",
            "Drama",
            "Thriller"
        ],
        "experience_type": "intense",
        "rating_percent": 92,
        "popularity_score": 0.98,
        "age_limit": 13,
        "netflix_url": "https://www.netflix.com/title/80114170",
        "prime_url": "https://www.amazon.com/dp/B07N8V9Y9Y",
        "year": 1996,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/zhGayNbH2ZHWaJkhSv3qEhs5fy6.jpg",
        "synopsis": "A veteran freedom fighter becomes a vigilante to root out corruption from the system, even if it means confronting his own son.",
        "quote": "Bribe is a crime. — For the country, against the corrupt.",
        "trailer": "fIKwCDuNqvg",
        "tags": [
            "classic",
            "vigilante",
            "blockbuster"
        ],
        "ottPlatforms": [
            {
                "name": "Netflix",
                "url": "https://www.netflix.com/title/80114170"
            },
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B07N8V9Y9Y"
            }
        ],
        "director": "S. Shankar",
        "cast": "Kamal Haasan, Manisha Koirala, Urmila Matondkar",
        "keywords": "vigilante, corruption, freedom fighter, social justice, father-son conflict",
        "cinematographer": "Jeeva",
        "music": "A. R. Rahman",
        "writer": "S. Shankar",
        "overview": "A veteran freedom fighter becomes a vigilante to root out corruption from the system, even if it means confronting his own son."
    },
    {
        "movie_id": 99,
        "title": "Nayakan",
        "genre": [
            "Action",
            "Crime",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 94,
        "popularity_score": 0.96,
        "age_limit": 18,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B07Y7V9Y9Y",
        "year": 1987,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/hnCKKPG5VkUiGQV0DTniyMTEZsT.jpg",
        "synopsis": "The transformation of an ordinary slum dweller into a feared underworld don in Mumbai, who acts as a savior for his people.",
        "quote": "Nallavana Kettavana? — To help the poor, sometimes you have to break the law.",
        "trailer": "1S6YkmYvgi8",
        "tags": [
            "classic",
            "epic",
            "cult"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B07Y7V9Y9Y"
            }
        ],
        "director": "Mani Ratnam",
        "cast": "Kamal Haasan, Saranya, Janagaraj",
        "keywords": "gangster, mumbai, savior, underworld, iconic",
        "cinematographer": "P. C. Sreeram",
        "music": "Ilaiyaraaja",
        "writer": "Mani Ratnam",
        "overview": "The transformation of an ordinary slum dweller into a feared underworld don in Mumbai, who acts as a savior for his people."
    },
    {
        "movie_id": 100,
        "title": "Thalapathi",
        "genre": [
            "Action",
            "Crime",
            "Drama"
        ],
        "experience_type": "intense",
        "rating_percent": 92,
        "popularity_score": 0.97,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "https://www.amazon.com/dp/B07N8V9Y9Y",
        "year": 1991,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/dpF1Ck1UvpW0ItT1EoX0xNYEhS8.jpg",
        "synopsis": "A courageous man abandoned at birth forms a deep bond with a powerful gangster and becomes his commander in a fight against injustice.",
        "quote": "Friendship is the highest form of love. — Loyal to the end.",
        "trailer": "wA30CKor18A",
        "tags": [
            "classic",
            "epic",
            "hit"
        ],
        "ottPlatforms": [
            {
                "name": "Prime Video",
                "url": "https://www.amazon.com/dp/B07N8V9Y9Y"
            }
        ],
        "director": "Mani Ratnam",
        "cast": "Rajinikanth, Mammootty, Arvind Swamy",
        "keywords": "friendship, loyalty, gangster, orphan, mahabharata",
        "cinematographer": "Santosh Sivan",
        "music": "Ilaiyaraaja",
        "writer": "Mani Ratnam",
        "overview": "A courageous man abandoned at birth forms a deep bond with a powerful gangster and becomes his commander in a fight against injustice."
    },
    {
        "movie_id": 101,
        "title": "Enthiran",
        "genre": [
            "Action",
            "Sci-Fi"
        ],
        "experience_type": "intense",
        "rating_percent": 84,
        "popularity_score": 0.98,
        "age_limit": 13,
        "netflix_url": "",
        "prime_url": "",
        "year": 2010,
        "poster": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/4Y0VoR5Nxi33SALjvd5j9UfkZEe.jpg",
        "synopsis": "A brilliant scientist creates an advanced humanoid robot that eventually develops human emotions and falls in love with the scientist's girlfriend.",
        "quote": "Dot! — Man's creation, man's destruction.",
        "trailer": "sY_F6issHsU",
        "tags": [
            "blockbuster",
            "sci-fi",
            "spectacle"
        ],
        "ottPlatforms": [
            {
                "name": "Sun NXT",
                "url": "https://www.sunnxt.com"
            }
        ],
        "director": "S. Shankar",
        "cast": "Rajinikanth, Aishwarya Rai Bachchan, Danny Denzongpa",
        "keywords": "robot, artificial intelligence, emotions, showdown, technology",
        "cinematographer": "Rathnavelu",
        "music": "A. R. Rahman",
        "writer": "S. Shankar",
        "overview": "A brilliant scientist creates an advanced humanoid robot that eventually develops human emotions and falls in love with the scientist's girlfriend."
    }
];

if (typeof module !== "undefined") { module.exports = MOVIES; }
