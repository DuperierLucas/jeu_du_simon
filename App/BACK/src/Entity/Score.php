<?php

namespace App\Entity;

use App\Repository\ScoreRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 *@ApiResource()
 * @ORM\Entity(repositoryClass=ScoreRepository::class)
 */
class Score
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $bestScore;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBestScore(): ?int
    {
        return $this->bestScore;
    }

    public function setBestScore(int $bestScore): self
    {
        $this->bestScore = $bestScore;

        return $this;
    }
}
