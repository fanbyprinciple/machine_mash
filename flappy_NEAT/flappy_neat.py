import pygame
import time
import os
import random

pygame.font.init()

WIN_WIDTH = 560
WIN_HEIGHT = 800

BIRD_IMGS = [pygame.transform.scale2x(pygame.image.load("./imgs/bird1.png")),pygame.transform.scale2x(pygame.image.load("./imgs/bird2.png")),pygame.transform.scale2x(pygame.image.load("./imgs/bird3.png"))]
PIPE_IMG = pygame.transform.scale2x(pygame.image.load("./imgs/pipe.png"))
BASE_IMG = pygame.transform.scale2x(pygame.image.load("./imgs/base.png"))
BG_IMG = pygame.transform.scale2x(pygame.image.load("./imgs/bg.png"))

STAT_FONT = pygame.font.SysFont("comicsans", 50)
class Bird:
    IMGS = BIRD_IMGS
    ANIMATION_TIME = 5

    def __init__(self,x,y):

        self.alive = True

        self.x = x
        self.y = y
        self.tick_count = 0
        self.vel = 0
        self.height = self.y
        self.img_count = 0
        self.img = self.IMGS[0]

    def move(self):
        self.tick_count += 1

        d = self.vel * self.tick_count + 1.5 * self.tick_count ** 2

        if( d>=16):
            d = 16
        if(d<0):
            d -= 2
        
        self.y = self.y + d
    
    def jump(self):
        self.vel = -10.5
        self.tick_count =0
        self.height = self.y


    def draw(self, win):

        if(self.alive):
            self.img_count += 1

            if(self.img_count < self.ANIMATION_TIME):
                self.img = self.IMGS[0]
            
            elif(self.img_count < 2 * self.ANIMATION_TIME):
                self.img = self.IMGS[1]
            
            elif(self.img_count < 3 *self.ANIMATION_TIME):
                self.img = self.IMGS[2]

            elif(self.img_count < 4 * self.ANIMATION_TIME):
                self.img = self.IMGS[1]

            else:
                self.img= self.IMGS[0]
                self.img_count = 0

        win.blit(self.img, (self.x, self.y))
    
    def get_mask(self):
        return pygame.mask.from_surface(self.img)


class Bg:
    VEL = 0
    WIDTH = BG_IMG.get_width()
    IMG = BG_IMG

    def __init__(self):
        self.x1 = 0
        self.x2 = self.WIDTH
        self.y = 0

        
    
    def move(self):
        self.x1 += self.VEL
        self.x2 += self.VEL

        if(self.x1 + self.WIDTH < 0):
            self.x1 = self.x2 + self.WIDTH
        
        if(self.x2 + self.WIDTH < 0):
            self.x2 = self.x1 + self.WIDTH
    
    def draw(self,win):
        win.blit(self.IMG, (self.x1, self.y))
        win.blit(self.IMG, (self.x2, self.y))

class Pipe:
    GAP = 200
    VEL = -5

    def __init__(self, x):
        self.x = x
        self.height = 0
        self.gap = 100

        self.top = 0
        self.bottom = 0
        self.PIPE_TOP = pygame.transform.flip(PIPE_IMG, False, True)
        self.PIPE_BOTTOM = PIPE_IMG

        self.passed = False
        self.set_height()
    
    def set_height(self):
        self.height= random.randrange(50, 450)
        self.top = self.height - self.PIPE_TOP.get_height()
        self.bottom = self.height + self.GAP

    def move(self):
        self.x += self.VEL
    
    def draw(self, win):
    
        win.blit(self.PIPE_TOP, (self.x, self.top))
        win.blit(self.PIPE_BOTTOM, (self.x, self.bottom))
    
    def collide(self, bird):
        bird_mask = bird.get_mask()
        top_mask = pygame.mask.from_surface(self.PIPE_TOP)
        bottom_mask = pygame.mask.from_surface(self.PIPE_BOTTOM)

        top_offset = (self.x - bird.x, self.top - round(bird.y))
        bottom_offset = (self.x - bird.x, self.bottom - round(bird.y))

        b_point = bird_mask.overlap(bottom_mask, bottom_offset)
        t_point = bird_mask.overlap(top_mask, top_offset)

        if (t_point or b_point):
            return True
        
        return False

def draw_canvas(win,bird,bg, pipes, score, high_score):

    bg.draw(win)

    for pipe in pipes:

        pipe.draw(win)

    score = STAT_FONT.render("Score: " +str(score), 1, (255,255,255))
    win.blit(score, (WIN_WIDTH -10 - score.get_width(), 10))

    high_score = STAT_FONT.render("High Score: " + str(high_score), 1, (255,255,255))
    win.blit(high_score,( 10,10))

    

    bird.draw(win)

    pygame.display.update()


def main():

    score = 0
    high_score = 0

    bg = Bg()
    bird = Bird(230,300)
    pipes = [Pipe(560)]
    win = pygame.display.set_mode((WIN_WIDTH, WIN_HEIGHT))
    clock = pygame.time.Clock()

    run  = True

    while (run):
        clock.tick(30)

        for event in pygame.event.get():
            if(event.type == pygame.QUIT):
                run = False

            if(event.type == pygame.KEYDOWN):
                if(event.key == pygame.K_SPACE):
                    bird.jump()

        bg.move()

        add_pipe = False
        rem = []

        for pipe in pipes:
            if pipe.collide(bird):
                print("Game over")
                score = 0
            
            if pipe.x + pipe.PIPE_TOP.get_width() < 0:
                rem.append(pipe)
            
            if not pipe.passed and pipe.x < bird.x:
                pipe.passed = True
                add_pipe = True
            
            if(bird.alive):
                pipe.move()
        
        if add_pipe:
            score += 1
            if(score > high_score):
                high_score = score
            pipes.append(Pipe(560))

        for r in rem:
            pipes.remove(r)

        if bird.alive:
            bird.move()

        if bird.y + bird.img.get_height() >= 760:
            
            bird.alive = False

            bird.y = 760

    
        draw_canvas(win, bird, bg, pipes,score, high_score)

        
    
    pygame.quit()
    quit()

main()


