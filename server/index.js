const express = require('express')
const cors =  require('cors')
const bodyParser =  require('body-parser')
const mysql = require('mysql2')

const app = express()
const port = 5000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Binh0366032155',
    database: 'youtube_app',
})


//  sidebar
app.get('/api/sidebar', async (req, res) => {
    const sql = `select title from sidebar`
    const results = await new Promise((resolve, reject) => {
        db.query(sql, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
    })
    const defaultSidebar = await Promise.all(results.map(async (result, index) => {
        // Thực hiện truy vấn thứ hai
        let query =  `
                select title, icon_active, icon, link from sidebar_item 
                where sidebar_id = ${index + 1}
            `;
        if (index === 2) {
            query = `
                select name as title, concat('/channel/', id) as link, avatar from channels
                where is_sub = 1
            `
        }
        if (index === 4) {
            query = `
                select title, link, avatar from sidebar_item
                where sidebar_id = 5
            `
        }
        const sidebarItem = await new Promise((resolve, reject) => {
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        return {
            ...result,
            sidebar_item: sidebarItem,
        };
    }));
    // res.json(defaultSidebar)
    const subSidebar = await new Promise((resolve, reject) => {
        const sql = `
            select title, icon, icon_active, link from sidebar_item
            where is_sub = '1'
            order by id
        `
        db.query(sql, (err, result) => {
            if(err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
    const result = {
        defaultSidebar: defaultSidebar,
        subSidebar: subSidebar,
    }
    res.json(result)
})

// home navigation
app.get('/home/navigation', (req, res) => {
    const sql = `
    select * from navigations
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

// video/Subcription
app.get('/feed/subscriptions', (req, res) => {
    const sql = `
    select v.* from videos v
    join channels c
    where v.id_channel = c.id
    and c.is_sub = 1
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

// channel
app.put('/@:id', (req, res) => {
    const channelId = req.params.id; 
    const value = req.body.isSub
    const sql = `
        update channels
        set is_sub = ${value}
        where id = '${channelId}'
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json('update Success')
    })
})
app.get('/@:id', async (req, res) => {
    const channelId = req.params.id
    const channel = await new Promise((resolve, reject) => {
        const sql = `
            select * from channels 
            where id = '${channelId}'
        `
        db.query(sql,(err, result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
    res.json(channel[0]);
});

// list videos
app.get('/video/all', (req, res) => {
    const sql = `
        select * from videos
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get('/video/new', (req, res) => {
    const sql = `
        select * from videos
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get('/video/like', (req, res) => {
    const sql = `
        select * from videos
        where videos.like = 1
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get('/video/playlist', (req, res) => {
    const sql = `
            select * from videos
            WHERE pos > 0
            order by pos
        `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get('/video/history', (req, res) => {
    const sql = `
            select * from videos
            Limit 10 
        `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get('/video/download', (req, res) => {
    const sql = `
        select * from videos
        where download = 1
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.get('/video/random', (req, res) => {
    const sql = `
        SELECT *
        FROM videos
        ORDER BY RAND()
        LIMIT 10;
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get('/comments/video/:idVideo', async (req, res) => {
    const idVideo = req.params.idVideo
    
    const comments = await new Promise((resolve, reject) => {
        const sql = `
            select c.id, c.like, c.comment, ch.id as channel, ch.avatar
            from comments c
            join channels ch
            where id_video = '${idVideo}'
            and ch.id = c.id_channel
            order by id desc
        `
        db.query(sql,(err, result) => {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
    res.json(comments);
})

app.post('/comments/:id', async (req, res) => {
    const id = req.params.id
    const sql = "Insert into comments (`id_video`, `id_channel`, `comment`) values (?)"
    const values = [
        id,
        req.body.channel,
        req.body.comment,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json('Add Success')
    })
})

app.put('/comments/:id', async (req, res) => {
    const id = req.params.id
    const value = [
        req.body.like,
        req.body.comment,
    ]
    const sql = `
        update comments
        set comments.like = ?, comment = ?
        where id = '${id}'
    `
    db.query(sql, value, (err, data) => {
        if(err) return res.json(err)
        return res.json('update Success')
    })
})

app.delete('/comments/:id', async (req, res) => {
    const id = req.params.id
    const sql = `
        delete from comments
        where id = '${id}'
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json('update Success')
    })
})


// type video
app.get('/video/:type', (req, res) => {
    const typeVideo = req.params.type; 
    const sql = `
        select * from videos
        where type = '${typeVideo}'
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
});
app.get('/video/channel/:channelId', (req, res) => {
    const channelId = req.params.channelId; 
    const sql = `
        select * from videos
        where id_channel = '${channelId}'
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
});


// videos/id
app.get('/video/watch/:videoId', (req, res) => {
    const videoId = req.params.videoId; 
    const sql = `
        select * from videos
        where id = '${videoId}'
    `
    db.query(sql, (err, data) => {
        if(err) return res.json(err)
        return res.json(data[0])
    })
});
app.put('/video/watch/:id', async (req, res) => {
    const videoId = req.params.id; 
    const plPos = req.body.plPos
    const value = [
        req.body.like,
        req.body.download,
    ]
    if(plPos === 'add') {
        const posAdd = await new Promise((resolve, reject) => {
            const sql = `
                select max(pos) as maxPos from videos
            `
            db.query(sql,(err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result[0].maxPos + 1)
                }
            })
        })
        const sql = `
            update videos
            set pos = ${posAdd}
            where id = '${videoId}'
        `
        db.query(sql, (err, data) => {
            if(err) return res.json(err)
            return res.json('update Success')
        })
    }else if (plPos === 'delete') {
        const prePos = await new Promise((resolve, reject) => {
            const sql = `
                select pos from videos
                where id = '${videoId}'
            `
            db.query(sql,(err, result) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(result[0].pos)
                }
            })
        })
        const sql = `
            update videos
            set pos = CASE
                WHEN pos > ${prePos} then pos - 1
                ELSE 0
                END
            where pos > ${prePos} or id = '${videoId}';
        `
        db.query(sql, (err, data) => {
            if(err) return res.json(err)
            return res.json('update Success')
        })
    }else {
        const sql = `
            update videos
            set videos.like = ?, download = ?
            where id = '${videoId}'
        `
        db.query(sql, value, (err, data) => {
            if(err) return res.json(err)
            return res.json('update Success')
        })
    }
})

app.put('/video/swapPos', async (req, res) => {
    const newIndex = req.body.newIndex
    const oldIndex = req.body.oldIndex
    if(oldIndex < newIndex) {
        const sql = `
            UPDATE videos
            SET pos = 
            CASE
                WHEN pos = ${oldIndex} THEN ${newIndex}
                WHEN pos <= ${newIndex} AND pos > ${oldIndex} THEN pos - 1
                else pos
            END;
        `
        db.query(sql, (err, data) => {
            if(err) return res.json(err)
            return res.json('update Success')
        })
    }
    else {
        const sql = `
            UPDATE videos
            SET pos = 
            CASE
                WHEN pos = ${oldIndex} THEN ${newIndex}
                WHEN pos < ${oldIndex} AND pos >= ${newIndex} THEN pos + 1
                else pos
            END;
        `
        db.query(sql, (err, data) => {
            if(err) return res.json(err)
            return res.json('update Success')
        })
    }
})  


app.listen(port, () => console.log(`http://localhost:${port}`))