# Public repository guide

A starting point for the 24 public repositories under [dianzdd123](https://github.com/dianzdd123), checked on 8 November 2026. All repository links below lead to the copies in this account, including forks. All 24 now have reuse guides, contribution guidance and lightweight structural checks. The latest pass adds the six newly forked projects and completes these additions for the three forks added previously. See the [maintenance record](MAINTENANCE_2026-11-08.md) for concrete repairs and validation limits. Read each project’s README before installing a research stack or running a hardware entry point.

## Research software and data

| Repository | What it contains | What you need to supply |
|---|---|---|
| [Optical-Microrobot-Database](https://github.com/dianzdd123/Optical-Microrobot-Database) | Project page; depth and pitch/roll baselines | Full image dataset and compatible ML environment |
| [Patch-Clamp-Localisation](https://github.com/dianzdd123/Patch-Clamp-Localisation) | Baseline definitions and heatmap-training experiment | Missing coarse-to-fine model/preprocessing modules, microscopy data and annotations |
| [DRL-MR-Microrobot](https://github.com/dianzdd123/DRL-MR-Microrobot) | Unity/MRTK teleoperation and navigation experiments | Matching simulator or HoloLens/Sensapex setup, calibration and local paths |
| [ICRA2025-OT-Gym](https://github.com/dianzdd123/ICRA2025-OT-Gym) | ZIP releases of optical-tweezer simulation, haptic control and models | Compatible Isaac Sim/ROS 1 environment; haptic devices for teleoperation |
| [Micro_Object_Sim2Real_ICRA_v2](https://github.com/dianzdd123/Micro_Object_Sim2Real_ICRA_v2) | Rendering, paired translation and pose-estimation workflow | Microscopy/CAD data, local paths and GPU environment |
| [MultiDiffSense](https://github.com/dianzdd123/MultiDiffSense) | Depth/text-conditioned tactile image generation | Model weights, sensor data for training and compatible GPU dependencies |
| [ADM_DP](https://github.com/dianzdd123/ADM_DP) | Vision/tactile/graph diffusion policies | Per-arm Zarr demonstrations, assets and simulator stack |
| [RealRobot](https://github.com/dianzdd123/RealRobot) | Occlusion-aware grasping and recorded RGB-D examples | Robot/camera hardware, calibration, weights and service configuration |
| [FYP_robotics](https://github.com/dianzdd123/FYP_robotics) | Language-guided single-/dual-robot pipeline | Robot endpoints, SAM2/CLIP, calibration and API configuration |
| [robot_grasp1](https://github.com/dianzdd123/robot_grasp1) | ROS 2 scan/stitch/detect/track/grasp workspace | Reconstructed ROS environment, device/model setup and calibration |

### Tactile perception, digital twins and additional releases

| Repository | What it contains | What you need to supply |
|---|---|---|
| [Tactile_Database](https://github.com/dianzdd123/Tactile_Database) | TacVerse tactile force, shape and grating benchmarks; MAE pretraining | External tactile dataset and a CUDA or Apple MPS training environment |
| [Micro_Object_Sim2Real](https://github.com/dianzdd123/Micro_Object_Sim2Real) | Separate public sim-to-real rendering, paired translation and pose-estimation release | Microscopy/CAD data, compatible ML environment and configured local paths; distinct from the ICRA v2 repository above |
| [CBS2025](https://github.com/dianzdd123/CBS2025) | Optical microrobot depth regression with local focus features and adaptive grids | Image/depth annotations, ML dependencies and configured paths; a local feature-extraction CLI and the preserved original Colab workflow are both provided |
| [TacEvo](https://github.com/dianzdd123/TacEvo) | LLM-guided tactile architecture evolution and supplementary material | Missing local dataset adapters, pre-generated architectures and archive initialiser; release check intentionally reports these blockers |
| [Tac-VGNN](https://github.com/dianzdd123/Tac-VGNN) | Voronoi tactile graph construction, GNN notebooks and example images | Compatible historical Torch/PyG environment, configured paths and sensor parameters |
| [digital-twin-ros2-rl-navigation](https://github.com/dianzdd123/digital-twin-ros2-rl-navigation) | Isaac scene, DQN checkpoint and ROS 2 deployment | ROS 2 Foxy/Isaac environment, resolved scene assets and matching live topics |
| [ot-haptic-feedback-digital-twin](https://github.com/dianzdd123/ot-haptic-feedback-digital-twin) | ROS 1 Geomagic haptic interface and pose/depth notebook | OpenHaptics drivers/SDK, perception inputs, calibration and simulator integration |
| [shallow-vessel-palpation-simulator-and-AI](https://github.com/dianzdd123/shallow-vessel-palpation-simulator-and-AI) | Taichi digital twin, tactile GNN training, evaluation and analyses | Linux NVIDIA/Docker environment and the linked external dataset/checkpoint bundle |
| [shallow-vessel-palpation-robot-control](https://github.com/dianzdd123/shallow-vessel-palpation-robot-control) | DOBOT arm experiments and synchronised tactile/kinematic recording | Calibrated DOBOT/ViTacTip hardware for new collection; released data can be analysed separately |

These nineteen research repositories are forks. Their primary code links use `dianzdd123`; upstream attribution and publication authorship remain in the repositories. Changes to these copies do not update the upstream repositories.

## Teaching, research workflow and website

| Repository | Use | Starting point |
|---|---|---|
| [deep-learning-labs-2026-27-students](https://github.com/dianzdd123/deep-learning-labs-2026-27-students) | Public student preparation and scheduled blank worksheets | Student guide and environment setup; Canvas is authoritative for assessment |
| [deep-learning-TA](https://github.com/dianzdd123/deep-learning-TA) | Diana course companion | Local static preview; live AI needs a separately configured backend and student access codes |
| [robotics-obsidian-paper-wiki-organizer](https://github.com/dianzdd123/robotics-obsidian-paper-wiki-organizer) | Python package for PDF copies, notes and review logs | Editable installation, small sample, then dry run |
| [llm-wiki-paper-organizer](https://github.com/dianzdd123/llm-wiki-paper-organizer) | Agent instructions and note templates | Read instructions and templates; this is not a standalone Python PDF application |
| [msei_website](https://github.com/dianzdd123/msei_website) | Deployed static lab website and editable JSON | Serve the repository root; the original Vue authoring project is absent |

## What the maintenance checks establish

All 24 local structural checks passed in the latest pass. They parse tracked Python, JSON and notebook containers, and verify local navigation links in the README, reuse guide and contribution guide. They do not import the research stacks or execute hardware. Eight OT-Gym ZIP archives also passed integrity checks; their archived programs were not executed.

| Targeted suite | Local result |
|---|---:|
| Optical microrobot pose discovery/splitting | 5 tests passed |
| MultiDiffSense source-grouped dataset splitting | 6 tests passed |
| Robotics paper organiser | 69 tests passed |
| Diana activation/session logic | 4 tests passed |
| Student weekly release logic | 3 tests passed |
| TacVerse ordered capture splitting and data-root override | 7 tests passed |
| Tac-VGNN early stopping and plotting utilities (Torch I/O mocked) | 6 tests passed |
| ROS 2 navigation offline CLI and import behaviour | 6 tests passed |
| TacEvo release inventory | 4 tests passed |
| CBS depth batch handling, loss accounting and Brenner arithmetic (array fixtures) | 4 tests passed |

The first five targeted suites above passed in the earlier maintenance pass; the final five (27 tests) passed in this update. Diana's JavaScript syntax checks and the current student release-visibility check also passed. These results do not establish full dependency reproducibility, live service availability, robot safety, model accuracy or reproduction of published experiments. Each of these 24 repositories has an automated structural workflow; hosted workflow status must be checked on GitHub for the relevant commit.

## Reuse permissions and remaining work

Five repositories contain a root licence: the two paper organisers, Tac-VGNN and the two shallow-vessel repositories. The optical haptic digital twin has a repository notice rather than a blanket permissive licence. The remaining 18 have no root licence file in this snapshot; their reuse terms need clarification before downstream redistribution can be assumed. This update preserves existing terms and does not relicense third-party code, research datasets, papers, model weights, teaching materials or images.

The most substantial remaining release blockers are the missing TacEvo dataset/seed/initialisation modules, missing patch-clamp implementation modules and data, machine-specific robot/simulator environments, and absent complete source for rebuilding the lab website. Their individual reuse guides describe these gaps. Public preparation materials and future course releases remain separate; this update does not publish assessed answers or advance any release date.
