# CMS (Contest Management System) — คู่มือการใช้งาน

>  CMS v1.5.x

---

## สารบัญ

1. [การติดตั้ง CMS](#1-การติดตั้ง-cms)
2. [โครงสร้าง Contest](#2-โครงสร้าง-Contest)
3. [โครงสร้าง Task](#3-โครงสร้าง-Task)
4. [จัดการ Users](#4-จัดการ-users)
5. [จัดการ Contest](#5-จัดการ-contest)
6. [จัดการ Admin](#6-จัดการ-admin)
7. [เรื่ม Contest](#7-เริ่ม-contest)

---

## 1. การติดตั้ง CMS

### ความต้องการของระบบ

- Docker Engine
- Docker Compose
- RAM อย่างน้อย 4 GB

### Clone Repository

```bash
git clone https://github.com/asc-base/POSN-CMS
cd cms
```

### เปลี่ยน branch ไปที่ html

``` bash
git branch -a
git switch html
```

### run shell เพื่อที่จะสร้าง cms-dev service ขึ้นมา 

```bash
./cms-dev.sh
```



## 2. โครงสร้าง Contest
### โครงสร้าง Contest folder 
 
```
my_contest/
├── contest.yaml
├── my_task1/
│   ├── task.yaml
│   └── ...
└── my_task2/
    ├── task.yaml
    └── ...
```


### contest.yml

```yaml
name: "CONTEST_1"                         ← ชื่อ contest จำเป็นต้องตรงกับ folder
description: "Contest 01: Good Luck!"     ← descriptoion ของ contest
languages:                                ← compiler ที่จะใช้
  - "C11 / gcc"
  - "C++11 / g++"
tasks:                                    ← ลงทะเบียน task ที่จะใช้
  - my_task1 
  - my_task2 
users:                                    ← ลงทะเบียน user ที่จะแข่ง
- username: username1
  password: password1 
- username: username2
  password: password2 
token_mode: infinite
```


## 3. โครงสร้าง Task 

### โครงสร้างโฟลเดอร์

```
my_task/
├── task.yaml           ← config หลักของ task (จำเป็น)
├── gen/
│   └── GEN             ← ไฟล์การให้คะแนน (จำเป็น)
├── statement/
│   └── statement.html  ← โจทย์ (จำเป็น)
├── input/
│   ├── input0.txt
│   ├── input1.txt
│   └── ...
├── output/
│   ├── output0.txt
│   ├── output1.txt
│   └── ...
├── check/
│   └── checker         ← compiled binary (ถ้าใช้ checker)
├── sol/
│   └── solution.cpp    ← solution ตัวอย่าง (optional)
└── att/
    └── example.cpp     ← ไฟล์แนบให้ contestant (optional)
```

### task.yaml
 
```yaml
name: "ชื่อ task ต้องตรงกับ folder"
title: "ชื่อโจทย์"
time_limit: 1
memory_limit: 256
n_input: 50   # จำนวน input
public_testcases: 1, 2, 3, 4, 5
infile: ''
outfile: ''
token_mode: infinite
```
### GEN

ไฟล์ GEN คะแนนทั้งหมดจำเป็นต้องบอกกันได้ 100 คะแนน
```text
ต้องถูกทั้งหมดถึงจะได้ 100 คะแนน
# ST: 100
1
2
3
4
___
แบ่งคะแนนเป็นช่วง
# ST:5
1
2
# ST: 10
3
4
___
กำหนดคะแนนแต่ล่ะข้อ
# ST:5
1
# ST:5
2
# ST: 10
3
# ST: 10
4
```

## 4. จัดการ users

เพิ่ม User ทีละคน
```bash
cmsAddUser -c {contest_id} firstname lastname username password
```

ตัวอย่าง:
```bash
cmsAddUser -c 1 สมชาย ใจดี somchai P@ssw0rd
```

เพิ่ม User ทีละหลายคน
```bash
cmsImportUser --all
```


## 5. จัดการ contest

1. เอา Contest เข้าระบบ และลงทะเบียน user ใน contest
```bash
cmsImportUser --all & cmsImportContest -i .
```

2. เริ่ม contest และ rank systems 

| Command | description |
|---|---| 
|cmsRankingWebServer | start Ranking service | 
|cmsResourceService | start ContestService | 
| -a | คือรันทุกระบบที่ต้องใช้ใน contest (ใช้กับ cmsResourceService)|


```bash
cmsRankingWebServer & cmsResourceService -a 

#หรือ
cmsRankingWebServer & cmsResourceService -a {contest_id}
```

## 6. จัดการ Admin
การเริ่ม admin
```bash
cmsAddAdmin -p {password} } {username}
```

## 7. เริ่ม contest
ก่อนที่จะเริ่มขั้นตอนที่ 1 ให้สร้าง tmux ก่อน
```bash 
tmux new -s {session-name}
```
หลังจากสร้าง session แล้วให้ทำตามหัวข้อที่ 1 [การติดตั้ง cms](#1-การติดตั้ง-cms)
จากนั้นให้ clone contest repository ใน container ของ cms
```bash
git clone {contest-repo}
```
ต่อมาให้ cd เข้าไปที่ contest repo

```bash
cd {contest-repo}
```
ให้เข้าไปที่ contest จะเพิ่มเข้าระบบ และรัน 
```bash
cmsImportUser --all & cmsImportContest -i .
```
เริ่ม contest 
```bash
cmsRankingWebServer & cmsResourceService -a 
```
contest จะถูกรันเรียบร้อย

แต่ล่ะ service จะถูกรันอยู่ที่ port
| Service | Port |
|---|---|
| Contest | 8888|
| Admin | 8889 |
| Ranking | 8890 |
